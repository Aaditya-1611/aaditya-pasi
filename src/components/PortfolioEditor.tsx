import React, { useState } from "react";
import { ProfileData, Project, Experience } from "../types";
import { X, Plus, Trash2, ShieldAlert, CheckCircle, RotateCcw } from "lucide-react";

interface PortfolioEditorProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: ProfileData;
  onSave: (data: ProfileData) => void;
  onReset: () => void;
}

export default function PortfolioEditor({
  isOpen,
  onClose,
  profileData,
  onSave,
  onReset
}: PortfolioEditorProps) {
  const [activeTab, setActiveTab] = useState<"general" | "skills" | "projects" | "experience">("general");
  const [formData, setFormData] = useState<ProfileData>({ ...profileData });
  const [newSkill, setNewSkill] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (color: ProfileData["themeColor"]) => {
    setFormData((prev) => ({ ...prev, themeColor: color }));
  };

  const handleSave = () => {
    onSave(formData);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      onClose();
    }, 1200);
  };

  // Skill modifiers
  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove)
    }));
  };

  // Project modifiers
  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const addProject = () => {
    const fresh: Project = {
      id: Date.now().toString(),
      title: "New Project",
      description: "Brief description of the awesome thing you built.",
      tags: ["React"],
      demoLink: "",
      codeLink: ""
    };
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, fresh]
    }));
  };

  const removeProject = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id)
    }));
  };

  // Experience modifiers
  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addExperience = () => {
    const fresh: Experience = {
      id: Date.now().toString(),
      company: "My Company",
      role: "Software Engineer",
      period: "2024 - Present",
      description: "Describe your accomplishments and core responsibilities."
    };
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, fresh]
    }));
  };

  const removeExperience = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in" id="portfolio-editor-modal">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-3xl h-[80vh] flex flex-col shadow-2xl relative overflow-hidden" id="editor-container">
        
        {/* Banner with Status */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/50" id="editor-header">
          <div>
            <h3 className="font-sans font-semibold text-lg text-white">Customize Your Portfolio</h3>
            <p className="font-mono text-xs text-zinc-500">Edit elements live and sync with your AI assistant.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-all cursor-pointer"
            id="btn-close-editor"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-zinc-800 bg-zinc-950/20 px-4" id="editor-tabs">
          {[
            { id: "general", label: "General Admin" },
            { id: "skills", label: "Skills & Accents" },
            { id: "projects", label: "Projects" },
            { id: "experience", label: "Experience" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 font-mono text-xs font-medium border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "border-violet-500 text-white"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
              id={`tab-btn-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Container Form */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6" id="editor-form-scrollable">
          {activeTab === "general" && (
            <div className="space-y-4" id="editor-general-tab">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleTextChange}
                    className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                    id="input-edit-name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">Professional Tagline</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleTextChange}
                    className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                    id="input-edit-role"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">Brief Biography</label>
                <textarea
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleTextChange}
                  className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 resize-none font-sans"
                  id="textarea-edit-bio"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">Contact Email (For Direct Form Alerts)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleTextChange}
                  className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                  id="input-edit-email"
                />
              </div>

              <div className="border-t border-zinc-800/60 my-4 pt-4">
                <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-2">Social Network Coordinates</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-zinc-500">GitHub Link</label>
                    <input
                      type="text"
                      name="github"
                      value={formData.github}
                      onChange={handleTextChange}
                      className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500"
                      id="input-edit-github"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-zinc-500">LinkedIn Link</label>
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleTextChange}
                      className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500"
                      id="input-edit-linkedin"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-zinc-500">Twitter Link</label>
                    <input
                      type="text"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleTextChange}
                      className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500"
                      id="input-edit-twitter"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-zinc-500">Instagram Link</label>
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleTextChange}
                      className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500"
                      id="input-edit-instagram"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "skills" && (
            <div className="space-y-6" id="editor-skills-tab">
              {/* Color Accents */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">Active Brand Color Accent</label>
                <div className="flex gap-3">
                  {[
                    { id: "violet", class: "bg-violet-600 border-violet-400" },
                    { id: "blue", class: "bg-blue-600 border-blue-400" },
                    { id: "teal", class: "bg-teal-500 border-teal-300" },
                    { id: "emerald", class: "bg-emerald-500 border-emerald-300" },
                    { id: "amber", class: "bg-amber-500 border-amber-300" },
                    { id: "rose", class: "bg-rose-500 border-rose-300" }
                  ].map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorChange(color.id as any)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${color.class} ${
                        formData.themeColor === color.id ? "scale-125 ring-2 ring-white/20" : "opacity-80 hover:opacity-100"
                      }`}
                      id={`color-picker-${color.id}`}
                      title={color.id}
                    />
                  ))}
                </div>
              </div>

              {/* Modify Skills Tags */}
              <div className="space-y-3">
                <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">Tech Stack Arsenal</label>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                    placeholder="E.g., Docker, GraphQL, Svelte..."
                    className="flex-1 bg-zinc-950 text-white placeholder-zinc-600 border border-zinc-800 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                    id="input-add-skill-tag"
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 bg-zinc-800 text-white text-xs font-mono rounded-xl hover:bg-zinc-750 transition-all flex items-center gap-1 cursor-pointer"
                    id="btn-add-skill-tag"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2" id="edit-skills-container">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs text-zinc-300 flex items-center gap-1.5 font-mono"
                      id={`skill-tag-${skill.toLowerCase()}`}
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-zinc-500 hover:text-rose-450 focus:outline-none rounded-full cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6" id="editor-projects-tab">
              <div className="flex justify-between items-center">
                <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">Highlighted Work Items ({formData.projects.length})</p>
                <button
                  onClick={addProject}
                  className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-mono rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                  id="btn-add-project"
                >
                  <Plus size={14} /> Add Project
                </button>
              </div>

              {formData.projects.map((proj) => (
                <div key={proj.id} className="bg-zinc-950 border border-zinc-850 p-4 rounded-2xl relative space-y-3" id={`edit-project-item-${proj.id}`}>
                  <button
                    onClick={() => removeProject(proj.id)}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-rose-400 transition-all cursor-pointer"
                    id={`btn-remove-project-${proj.id}`}
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-zinc-500">Project Title</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updateProject(proj.id, "title", e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500"
                      id={`input-project-title-${proj.id}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-zinc-500">Project Description</label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500 resize-none"
                      id={`textarea-project-description-${proj.id}`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-zinc-500">Live Demo URL</label>
                      <input
                        type="text"
                        value={proj.demoLink || ""}
                        onChange={(e) => updateProject(proj.id, "demoLink", e.target.value)}
                        placeholder="E.g., https://example.com"
                        className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-3 py-1.5 text-[11px] focus:outline-none focus:ring-1 focus:ring-violet-500"
                        id={`input-project-demo-${proj.id}`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-zinc-500">Source Code Code Link</label>
                      <input
                        type="text"
                        value={proj.codeLink || ""}
                        onChange={(e) => updateProject(proj.id, "codeLink", e.target.value)}
                        placeholder="E.g., https://github.com..."
                        className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-3 py-1.5 text-[11px] focus:outline-none focus:ring-1 focus:ring-violet-500"
                        id={`input-project-code-${proj.id}`}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-zinc-500">Tags (Comma separated list)</label>
                    <input
                      type="text"
                      value={proj.tags.join(", ")}
                      onChange={(e) => updateProject(proj.id, "tags", e.target.value.split(",").map(t => t.trim()).filter(Boolean))}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-3 py-1.5 text-[11px] focus:outline-none focus:ring-1 focus:ring-violet-500"
                      id={`input-project-tags-${proj.id}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "experience" && (
            <div className="space-y-6" id="editor-experience-tab">
              <div className="flex justify-between items-center">
                <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">Employment Records timeline ({formData.experiences.length})</p>
                <button
                  onClick={addExperience}
                  className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-mono rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                  id="btn-add-experience"
                >
                  <Plus size={14} /> Add Experience
                </button>
              </div>

              {formData.experiences.map((exp) => (
                <div key={exp.id} className="bg-zinc-950 border border-zinc-850 p-4 rounded-2xl relative space-y-3" id={`edit-experience-item-${exp.id}`}>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-rose-450 transition-all cursor-pointer"
                    id={`btn-remove-experience-${exp.id}`}
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-zinc-500">Company Name</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500"
                        id={`input-experience-company-${exp.id}`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-zinc-500">Professional Role / Title</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500"
                        id={`input-experience-role-${exp.id}`}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-zinc-500">Active Period (Format: e.g. 2024 - Present)</label>
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => updateExperience(exp.id, "period", e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500"
                      id={`input-experience-period-${exp.id}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-zinc-500">Description of Achievements</label>
                    <textarea
                      rows={2}
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500 resize-none"
                      id={`textarea-experience-desc-${exp.id}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/60 flex items-center justify-between" id="editor-actions">
          <button
            onClick={() => {
              if (confirm("Are you sure you want to reset everything back to the premium default developer settings?")) {
                onReset();
                onClose();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-xl text-xs font-mono transition-all cursor-pointer"
            id="btn-reset-defaults"
          >
            <RotateCcw size={13} /> Reset Mockup
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-350 hover:text-white rounded-xl text-xs font-mono transition-all cursor-pointer"
              id="btn-cancel-edit"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md inline-flex items-center gap-1 cursor-pointer"
              id="btn-save-edit"
            >
              Save Live Elements
            </button>
          </div>
        </div>

        {/* Success Alert Overlay */}
        {successMsg && (
          <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center space-y-3 animate-fade-in" id="success-save-indicator">
            <CheckCircle className="text-emerald-500 animate-bounce" size={48} />
            <span className="font-sans font-bold text-lg text-white">Saving Interactive Widgets...</span>
            <span className="font-mono text-xs text-zinc-500">Avatar duplicate is syncing updated bio profiles.</span>
          </div>
        )}
      </div>
    </div>
  );
}
