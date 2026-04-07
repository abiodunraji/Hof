import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from 'react';

const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;
const UPLOAD_URL    = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

interface Props {
  label: string;
  value: string;           // current URL (stored in project)
  onChange: (url: string) => void;
  folder: string;          // Cloudinary folder, e.g. "hof-interiors" or "hof-construction"
  required?: boolean;
}

type UploadState = 'idle' | 'uploading' | 'error';

async function uploadToCloudinary(file: File, folder: string): Promise<string> {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', UPLOAD_PRESET);
  fd.append('folder', folder);

  const res = await fetch(UPLOAD_URL, { method: 'POST', body: fd });
  if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
  const data = await res.json() as { secure_url: string };
  return data.secure_url;
}

export function ImageUploader({ label, value, onChange, folder, required }: Props) {
  const [state, setState]       = useState<UploadState>('idle');
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select an image file (JPG, PNG, WebP, etc.)');
      setState('error');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setErrorMsg('File too large — maximum 20 MB.');
      setState('error');
      return;
    }

    setState('uploading');
    setProgress(10);
    setErrorMsg('');

    // Incremental progress ticks while the real upload runs
    const ticker = setInterval(() => {
      setProgress((p) => (p < 85 ? p + 5 : p));
    }, 400);

    try {
      const url = await uploadToCloudinary(file, folder);
      clearInterval(ticker);
      setProgress(100);
      onChange(url);
      setState('idle');
    } catch (err) {
      clearInterval(ticker);
      setErrorMsg(err instanceof Error ? err.message : 'Upload failed. Please try again.');
      setState('error');
      setProgress(0);
    }
  }, [onChange, folder]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset so same file can be re-selected after an error
    e.target.value = '';
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    onChange('');
    setState('idle');
    setProgress(0);
    setErrorMsg('');
  };

  const uploading = state === 'uploading';

  /*
   * <label> wrapping <input type="file"> is the standard semantic HTML pattern for
   * custom file upload controls. Clicking the label activates the input natively —
   * no role="button", onClick, or onKeyDown needed. This avoids nested-interactive
   * violations and provides implicit accessible labeling for the input.
   */
  return (
    <div className="admin-field">
      {/* Visible field label (not the upload zone label) */}
      <span className="admin-uploader__field-label">
        {label}
        {required && <span className="admin-uploader__required"> *</span>}
      </span>

      {/* Drop zone — uses <label> so clicking it opens the file picker natively */}
      <label
        className={[
          'admin-uploader',
          dragging  ? 'admin-uploader--drag' : '',
          uploading ? 'admin-uploader--busy'  : '',
          value     ? 'admin-uploader--has-image' : '',
          state === 'error' ? 'admin-uploader--error' : '',
        ].filter(Boolean).join(' ')}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        aria-label={value ? `Replace ${label}` : `Upload ${label}`}
      >
        {/* Native file input — implicitly labeled by the parent <label> */}
        <input
          type="file"
          accept="image/*"
          className="admin-uploader__input"
          onChange={handleInputChange}
          disabled={uploading}
        />

        {/* Preview */}
        {value && !uploading && (
          <img src={value} alt="Preview" className="admin-uploader__preview" />
        )}

        {/* Upload progress */}
        {uploading && (
          <div className="admin-uploader__progress-wrap">
            <div className="admin-uploader__spinner" />
            <p className="admin-uploader__progress-label">Uploading… {progress}%</p>
            <progress
              className="admin-uploader__progress-bar"
              value={progress}
              max={100}
            />
          </div>
        )}

        {/* Empty / prompt state */}
        {!value && !uploading && (
          <div className="admin-uploader__prompt">
            <span className="admin-uploader__icon" aria-hidden="true">↑</span>
            <p className="admin-uploader__headline">
              {dragging ? 'Drop to upload' : 'Click or drag an image here'}
            </p>
            <p className="admin-uploader__sub">JPG, PNG, WebP · max 20 MB</p>
          </div>
        )}
      </label>

      {/* Actions row — shown when an image is loaded */}
      {value && !uploading && (
        <div className="admin-uploader__actions">
          <label className="admin-text-btn admin-uploader__replace-label">
            Replace image
            <input
              type="file"
              accept="image/*"
              className="admin-uploader__input"
              onChange={handleInputChange}
            />
          </label>
          <button
            type="button"
            onClick={handleRemove}
            className="admin-text-btn admin-text-btn--danger"
          >
            Remove
          </button>
        </div>
      )}

      {/* Error message */}
      {state === 'error' && errorMsg && (
        <p className="admin-uploader__error" role="alert">{errorMsg}</p>
      )}
    </div>
  );
}

// ── Gallery uploader (multiple images, reorderable list) ──────────────────────

interface GalleryProps {
  urls: string[];
  onChange: (urls: string[]) => void;
  folder: string;
}

export function GalleryUploader({ urls, onChange, folder }: GalleryProps) {
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg]   = useState('');
  const [dragging, setDragging]   = useState(false);

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const arr = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (!arr.length) return;

    setUploading(true);
    setErrorMsg('');
    const results: string[] = [];

    for (const file of arr) {
      if (file.size > 20 * 1024 * 1024) {
        setErrorMsg(`"${file.name}" skipped — exceeds 20 MB limit.`);
        continue;
      }
      try {
        const url = await uploadToCloudinary(file, folder);
        results.push(url);
      } catch {
        setErrorMsg(`Failed to upload "${file.name}". Other images were added.`);
      }
    }

    onChange([...urls, ...results]);
    setUploading(false);
  }, [urls, onChange, folder]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const handleRemove = (index: number) => {
    onChange(urls.filter((_, i) => i !== index));
  };

  const handleMove = (index: number, dir: 'up' | 'down') => {
    const next = [...urls];
    const swap = dir === 'up' ? index - 1 : index + 1;
    [next[index], next[swap]] = [next[swap], next[index]];
    onChange(next);
  };

  return (
    <div className="admin-field">
      <span className="admin-uploader__field-label">Gallery images</span>

      {/* Existing images */}
      {urls.length > 0 && (
        <div className="admin-gallery-grid">
          {urls.map((url, i) => (
            <div key={url + i} className="admin-gallery-item">
              <img src={url} alt={`Gallery ${i + 1}`} className="admin-gallery-item__img" />
              <div className="admin-gallery-item__overlay">
                <button type="button" onClick={() => handleMove(i, 'up')}
                  disabled={i === 0} className="admin-gallery-item__btn" title="Move left">◀</button>
                <button type="button" onClick={() => handleMove(i, 'down')}
                  disabled={i === urls.length - 1} className="admin-gallery-item__btn" title="Move right">▶</button>
                <button type="button" onClick={() => handleRemove(i)}
                  className="admin-gallery-item__btn admin-gallery-item__btn--remove" title="Remove">×</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add more drop zone — <label> wrapping <input multiple> */}
      <label
        className={[
          'admin-uploader admin-uploader--gallery',
          dragging  ? 'admin-uploader--drag' : '',
          uploading ? 'admin-uploader--busy'  : '',
        ].filter(Boolean).join(' ')}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        aria-label="Add gallery images"
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="admin-uploader__input"
          onChange={handleInputChange}
          disabled={uploading}
        />
        {uploading ? (
          <div className="admin-uploader__progress-wrap">
            <div className="admin-uploader__spinner" />
            <p className="admin-uploader__progress-label">Uploading…</p>
          </div>
        ) : (
          <div className="admin-uploader__prompt">
            <span className="admin-uploader__icon" aria-hidden="true">+</span>
            <p className="admin-uploader__headline">
              {dragging ? 'Drop to add' : 'Add gallery images'}
            </p>
            <p className="admin-uploader__sub">Select multiple · JPG, PNG, WebP · max 20 MB each</p>
          </div>
        )}
      </label>

      {errorMsg && <p className="admin-uploader__error" role="alert">{errorMsg}</p>}
    </div>
  );
}
