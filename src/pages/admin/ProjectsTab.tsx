import { useState } from 'react';
import { Switch } from '../../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Separator } from '../../components/ui/separator';
import { ImageUploader, GalleryUploader } from '../../components/admin/ImageUploader';
import {
  type ManagedInteriorsProject,
  type ManagedConstructionProject,
  type PortfolioStore,
  loadPortfolioStore,
  savePortfolioStore,
} from '../../hooks/usePortfolioData';

// ── Helpers ───────────────────────────────────────────────────────────────────

function lines(arr: string[] | undefined): string {
  return (arr ?? []).join('\n');
}

function parseLines(text: string): string[] {
  return text.split('\n').map((s) => s.trim()).filter(Boolean);
}

// ── Empty project templates ───────────────────────────────────────────────────

function emptyInteriors(): ManagedInteriorsProject {
  return {
    id: Date.now(), title: '', category: 'Living Rooms', description: '',
    fullDescription: '', image: '', gallery: [], tags: [], highlights: [],
    location: '', year: new Date().getFullYear().toString(),
    budget: '', duration: '', size: '', visible: true,
  };
}

function emptyConstruction(): ManagedConstructionProject {
  return {
    id: Date.now(), title: '', category: 'Residential', description: '',
    fullDescription: '', image: '', gallery: [], tags: [], highlights: [],
    location: '', year: new Date().getFullYear().toString(),
    budget: '', duration: '', size: '', visible: true,
  };
}

// ── Field primitives ──────────────────────────────────────────────────────────

function F({ label, id, value, onChange, placeholder, type = 'text' }: {
  label: string; id: string; value: string;
  onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div className="admin-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value}
        onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function TA({ label, id, value, onChange, placeholder, rows = 3 }: {
  label: string; id: string; value: string;
  onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <div className="admin-field">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} value={value} rows={rows}
        onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

// ── Project form ──────────────────────────────────────────────────────────────

type AnyProject = ManagedInteriorsProject | ManagedConstructionProject;

function ProjectForm<T extends AnyProject>({
  initial, categories, folder, onSave, onCancel, isNew,
}: {
  initial: T; categories: string[]; folder: string;
  onSave: (p: T) => void; onCancel: () => void; isNew: boolean;
}) {
  const [draft, setDraft] = useState<T>({ ...initial });
  const [tagsText, setTagsText] = useState(lines(initial.tags));
  const [highlightsText, setHighlightsText] = useState(lines(initial.highlights));

  const set = <K extends keyof T>(key: K, value: T[K]) =>
    setDraft((p) => ({ ...p, [key]: value }));

  const handleSave = () => {
    onSave({ ...draft, tags: parseLines(tagsText), highlights: parseLines(highlightsText) } as T);
  };

  const valid = draft.title.trim().length > 0 && draft.image.trim().length > 0;

  return (
    <div className="admin-project-form">

      {/* Header */}
      <div className="admin-form-header">
        <h3 className="admin-form-header__title">
          {isNew ? 'Add new project' : `Edit — ${initial.title || 'Untitled'}`}
        </h3>
        <button type="button" onClick={onCancel} className="admin-form-header__close">×</button>
      </div>

      {/* Body */}
      <div className="admin-form-body">

        {/* Identity */}
        <div className="admin-field-grid-2">
          <F label="Title *" id="proj-title" value={draft.title}
            onChange={(v) => set('title', v as T['title'])} placeholder="Project name" />
          <div className="admin-field">
            <label htmlFor="proj-category">Category</label>
            <select
              id="proj-category"
              value={draft.category}
              onChange={(e) => set('category', e.target.value as T['category'])}
            >
              {categories.filter((c) => c !== 'All').map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Meta */}
        <div className="admin-field-grid-3">
          <F label="Year" id="proj-year" value={draft.year}
            onChange={(v) => set('year', v as T['year'])} placeholder="2024" />
          <F label="Duration" id="proj-duration" value={draft.duration}
            onChange={(v) => set('duration', v as T['duration'])} placeholder="8 weeks" />
          <F label="Size" id="proj-size" value={draft.size}
            onChange={(v) => set('size', v as T['size'])} placeholder="1,200 sq ft" />
        </div>

        <div className="admin-field-grid-2">
          <F label="Location" id="proj-location" value={draft.location}
            onChange={(v) => set('location', v as T['location'])} placeholder="Lagos, Nigeria" />
          <F label="Budget" id="proj-budget" value={draft.budget}
            onChange={(v) => set('budget', v as T['budget'])} placeholder="₦5,000,000" />
        </div>

        <Separator />

        {/* Images */}
        <ImageUploader
          label="Hero image"
          value={draft.image}
          onChange={(url) => set('image', url as T['image'])}
          folder={folder}
          required
        />
        <GalleryUploader
          urls={draft.gallery ?? []}
          onChange={(urls) => set('gallery', urls as T['gallery'])}
          folder={folder}
        />

        <Separator />

        {/* Text content */}
        <TA label="Short description" id="proj-desc" value={draft.description}
          onChange={(v) => set('description', v as T['description'])}
          placeholder="One or two sentence summary shown on the portfolio card." rows={2} />
        <TA label="Full description (shown in modal)" id="proj-fulldesc"
          value={draft.fullDescription ?? ''}
          onChange={(v) => set('fullDescription', v as T['fullDescription'])}
          placeholder="Detailed project write-up shown when the visitor opens the project." rows={4} />
        <TA label="Highlights (one per line)" id="proj-highlights"
          value={highlightsText} onChange={setHighlightsText}
          placeholder={'Custom pendant lighting\nNatural stone walls\nIntegrated wine display'} rows={4} />
        <TA label="Tags (one per line)" id="proj-tags"
          value={tagsText} onChange={setTagsText}
          placeholder={'Contemporary\nLuxury\nAfrican Art'} rows={2} />

        <Separator />

        {/* Visibility */}
        <div className="admin-form-visibility">
          <div>
            <p className="admin-form-visibility__label">Visible on site</p>
            <p className="admin-form-visibility__desc">Hidden projects stay saved but won't appear publicly.</p>
          </div>
          <Switch
            checked={draft.visible !== false}
            onCheckedChange={(v) => set('visible', v as T['visible'])}
          />
        </div>

      </div>

      {/* Footer */}
      <div className="admin-form-footer">
        <button type="button" onClick={onCancel} className="admin-btn-ghost">Cancel</button>
        <button type="button" onClick={handleSave} disabled={!valid} className="admin-btn-primary">
          {isNew ? 'Add project' : 'Save changes'}
        </button>
      </div>

    </div>
  );
}

// ── Single project row ────────────────────────────────────────────────────────

function ProjectRow<T extends AnyProject>({
  project, index, total, onEdit, onDelete, onMove, onToggleVisible,
}: {
  project: T; index: number; total: number;
  onEdit: () => void; onDelete: () => void;
  onMove: (dir: 'up' | 'down') => void; onToggleVisible: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const hidden = project.visible === false;

  return (
    <div className={`admin-project-row${hidden ? ' admin-project-row--hidden' : ''}`}>

      {/* Thumbnail */}
      <div className="admin-project-thumb">
        {project.image
          ? <img src={project.image} alt={project.title}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          : <span>◻</span>}
      </div>

      {/* Info */}
      <div className="admin-project-info">
        <p className={project.title ? 'admin-project-title' : 'admin-project-title admin-project-title--untitled'}>
          {project.title || 'Untitled'}
        </p>
        <div className="admin-project-meta">
          <span className="admin-project-badge">{project.category}</span>
          <span className="admin-project-year">{project.year}</span>
          {hidden && <span className="admin-project-hidden-tag">hidden</span>}
        </div>
      </div>

      {/* Actions */}
      <div className="admin-project-actions">
        <button type="button" onClick={() => onMove('up')} disabled={index === 0}
          title="Move up" className="admin-icon-btn">▲</button>
        <button type="button" onClick={() => onMove('down')} disabled={index === total - 1}
          title="Move down" className="admin-icon-btn">▼</button>
        <button type="button" onClick={onToggleVisible}
          title={hidden ? 'Show on site' : 'Hide from site'} className="admin-icon-btn">
          {hidden ? '👁' : '🙈'}
        </button>
        <button type="button" onClick={onEdit} title="Edit project" className="admin-icon-btn">✏</button>

        {confirmDelete ? (
          <div className="admin-delete-confirm">
            <button type="button" onClick={onDelete} className="admin-delete-confirm__yes">Delete</button>
            <button type="button" onClick={() => setConfirmDelete(false)} className="admin-delete-confirm__cancel">×</button>
          </div>
        ) : (
          <button type="button" onClick={() => setConfirmDelete(true)}
            title="Delete project" className="admin-icon-btn admin-icon-btn--danger">🗑</button>
        )}
      </div>

    </div>
  );
}

// ── Section manager ───────────────────────────────────────────────────────────

function SectionManager<T extends AnyProject>({
  projects, categories, folder, onSave, onReset, emptyFn, savedBanner,
}: {
  projects: T[]; categories: string[]; folder: string;
  onSave: (updated: T[]) => void; onReset: () => void;
  emptyFn: () => T; savedBanner: () => void;
}) {
  const [list, setList] = useState<T[]>(() => projects);
  const [editingId, setEditingId] = useState<number | 'new' | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const [prevProjects, setPrevProjects] = useState(projects);
  if (projects !== prevProjects) {
    setPrevProjects(projects);
    setList(projects);
    setEditingId(null);
  }

  const commit = (updated: T[]) => { setList(updated); onSave(updated); savedBanner(); };

  const handleAdd    = (p: T) => { commit([...list, p]); setEditingId(null); };
  const handleEdit   = (p: T) => { commit(list.map((x) => (x.id === p.id ? p : x))); setEditingId(null); };
  const handleDelete = (id: number) => commit(list.filter((x) => x.id !== id));
  const handleMove   = (index: number, dir: 'up' | 'down') => {
    const next = [...list];
    const swap = dir === 'up' ? index - 1 : index + 1;
    [next[index], next[swap]] = [next[swap], next[index]];
    commit(next);
  };
  const handleToggleVisible = (id: number) =>
    commit(list.map((x) => (x.id === id ? { ...x, visible: x.visible !== false ? false : true } : x)));

  return (
    <div>
      {/* Toolbar */}
      <div className="admin-toolbar">
        <p className="admin-toolbar__stat">
          <strong>{list.filter((p) => p.visible !== false).length}</strong> visible
          &nbsp;·&nbsp; {list.length} total
        </p>
        <button type="button" onClick={() => setEditingId('new')}
          disabled={editingId !== null} className="admin-btn-primary">
          + Add project
        </button>
      </div>

      {/* New project form */}
      {editingId === 'new' && (
        <ProjectForm<T>
          initial={emptyFn() as T} categories={categories} folder={folder}
          onSave={handleAdd} onCancel={() => setEditingId(null)} isNew />
      )}

      {/* Project list */}
      <div className="admin-project-list">
        {list.length === 0 && (
          <div className="admin-empty-state">
            No projects yet. Click "+ Add project" to get started.
          </div>
        )}
        {list.map((project, index) => (
          <div key={project.id}>
            {editingId === project.id
              ? <ProjectForm<T> initial={project} categories={categories} folder={folder}
                  onSave={handleEdit} onCancel={() => setEditingId(null)} isNew={false} />
              : <ProjectRow<T> project={project} index={index} total={list.length}
                  onEdit={() => setEditingId(project.id)}
                  onDelete={() => handleDelete(project.id)}
                  onMove={(dir) => handleMove(index, dir)}
                  onToggleVisible={() => handleToggleVisible(project.id)} />}
          </div>
        ))}
      </div>

      {/* Section reset */}
      <div className="admin-footer-actions admin-footer-actions--sm">
        {!showResetConfirm ? (
          <button type="button" onClick={() => setShowResetConfirm(true)}
            className="admin-text-btn admin-text-btn--faint">
            Reset this section to defaults
          </button>
        ) : (
          <div className="admin-reset-confirm">
            <span className="admin-reset-confirm__prompt">
              This will restore the original projects for this section.
            </span>
            <button type="button" onClick={() => { onReset(); setShowResetConfirm(false); }}
              className="admin-text-btn admin-text-btn--danger">Yes, reset</button>
            <button type="button" onClick={() => setShowResetConfirm(false)}
              className="admin-text-btn admin-text-btn--cancel">Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main exported tab ─────────────────────────────────────────────────────────

export function ProjectsTab({ onSaved }: { onSaved: () => void }) {
  const [store, setStore] = useState<PortfolioStore>(() => loadPortfolioStore());

  const updateInteriors = (projects: ManagedInteriorsProject[]) => {
    const next = { ...store, interiors: projects };
    savePortfolioStore(next); setStore(next);
  };

  const updateConstruction = (projects: ManagedConstructionProject[]) => {
    const next = { ...store, construction: projects };
    savePortfolioStore(next); setStore(next);
  };

  const resetInteriors = () => {
    localStorage.removeItem('hofAdminPortfolio');
    const defaults = loadPortfolioStore();
    const next: PortfolioStore = {
      interiors: defaults.interiors,
      construction: store.construction,
      interiorsCategories: defaults.interiorsCategories,
      constructionCategories: store.constructionCategories,
    };
    savePortfolioStore(next); setStore(next); onSaved();
  };

  const resetConstruction = () => {
    localStorage.removeItem('hofAdminPortfolio');
    const defaults = loadPortfolioStore();
    const next: PortfolioStore = {
      interiors: store.interiors,
      construction: defaults.construction,
      interiorsCategories: store.interiorsCategories,
      constructionCategories: defaults.constructionCategories,
    };
    savePortfolioStore(next); setStore(next); onSaved();
  };

  return (
    <Tabs defaultValue="interiors">
      <TabsList>
        <TabsTrigger value="interiors">HOF Interiors</TabsTrigger>
        <TabsTrigger value="construction">HOF Construction</TabsTrigger>
      </TabsList>

      <TabsContent value="interiors">
        <div className="admin-panel">
          <div className="admin-panel__header">
            <h2 className="admin-panel__title">Interiors Projects</h2>
            <p className="admin-panel__subtitle">
              Add, edit, reorder, or hide projects shown on the Interiors portfolio page.
            </p>
          </div>
          <Separator />
          <div className="admin-panel-body">
            <SectionManager<ManagedInteriorsProject>
              projects={store.interiors} categories={store.interiorsCategories}
              folder="hof-interiors"
              onSave={updateInteriors} onReset={resetInteriors}
              emptyFn={emptyInteriors} savedBanner={onSaved} />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="construction">
        <div className="admin-panel">
          <div className="admin-panel__header">
            <h2 className="admin-panel__title">Construction Projects</h2>
            <p className="admin-panel__subtitle">
              Add, edit, reorder, or hide projects shown on the Construction portfolio page.
            </p>
          </div>
          <Separator />
          <div className="admin-panel-body">
            <SectionManager<ManagedConstructionProject>
              projects={store.construction} categories={store.constructionCategories}
              folder="hof-construction"
              onSave={updateConstruction} onReset={resetConstruction}
              emptyFn={emptyConstruction} savedBanner={onSaved} />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
