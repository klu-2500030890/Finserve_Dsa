import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import type { FinancialDocument } from '../../types';
import { useAuth } from '../../context/AuthContext';
import {
  FileText,
  Search,
  Plus,
  GitBranch,
  ExternalLink,
  Clock,
  X
} from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const { canManageSystem } = useAuth();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState<FinancialDocument[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<FinancialDocument | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDoc, setNewDoc] = useState({
    title: '',
    documentType: 'LOAN_AGREEMENT',
    content: '',
    category: 'LEGAL'
  });

  const loadDocuments = async () => {
    try {
      setIsLoading(true);
      const data = await api.getDocuments(search);
      setDocuments(data);
    } catch (err) {
      console.error("Error loading documents:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [search]);

  const handleCreateDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createDocument(newDoc);
      setIsModalOpen(false);
      setNewDoc({ title: '', documentType: 'LOAN_AGREEMENT', content: '', category: 'LEGAL' });
      loadDocuments();
    } catch (err) {
      alert("Failed to upload document: " + (err as any).message);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-wide">Financial Document Index</h1>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {documents.length} Indexed Contracts
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Full-text legal corpus indexed using Suffix Arrays (SA-IS) and Suffix Automata for O(M log N) exact substring queries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dsa/m2-suffix')}
            className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-semibold text-xs flex items-center gap-2 transition-all"
          >
            <GitBranch className="w-4 h-4" />
            <span>Suffix Intelligence Lab (M2)</span>
          </button>

          {canManageSystem && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Index Document</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 p-4 rounded-2xl glass-panel border border-slate-800">
        <Search className="w-4 h-4 text-cyan-400 shrink-0" />
        <input
          type="text"
          placeholder="Search document corpus by clause, counterparty, covenant, or SWIFT slip text..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
        />
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-slate-500 font-mono text-xs">
            Loading Indexed Legal Corpus...
          </div>
        ) : documents.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500 font-mono text-xs">
            No indexed documents found matching query.
          </div>
        ) : (
          documents.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-3xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono font-semibold">
                    {doc.documentType}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    ID: DOC-{doc.id.toString().padStart(4, '0')}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {doc.content}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : 'Recent'}
                </span>

                <button
                  onClick={() => setSelectedDoc(doc)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                >
                  <span>Inspect Suffixes</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Document Inspector Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-2xl bg-slate-950 border border-cyan-500/40 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedDoc.title}</h3>
                  <span className="text-[10px] font-mono text-cyan-400">{selectedDoc.documentType}</span>
                </div>
              </div>
              <button onClick={() => setSelectedDoc(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
              {selectedDoc.content}
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-slate-800">
              <span className="text-[11px] font-mono text-slate-400">
                Indexed in Suffix Automaton DAWG &bull; Length: {selectedDoc.content.length} chars
              </span>
              <button
                onClick={() => {
                  setSelectedDoc(null);
                  navigate('/dsa/m2-suffix');
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 flex items-center gap-1.5"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Open in Suffix Lab</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Index Document Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-950 border border-cyan-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Index New Legal Contract</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDocument} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Contract Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Syndicated Revolving Credit Agreement"
                  value={newDoc.title}
                  onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Contract Classification</label>
                <select
                  value={newDoc.documentType}
                  onChange={(e) => setNewDoc({ ...newDoc, documentType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="LOAN_AGREEMENT">LOAN_AGREEMENT</option>
                  <option value="SWIFT_SLIP">SWIFT_REMITTANCE_SLIP</option>
                  <option value="KYC_RECORD">KYC_IDENTITY_DECLARATION</option>
                  <option value="AUDIT_TRANSCRIPT">AUDIT_TRANSCRIPT</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Full Document Text Content</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Paste legal contract clause or SWIFT message payload..."
                  value={newDoc.content}
                  onChange={(e) => setNewDoc({ ...newDoc, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
                >
                  Index into Suffix Engine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
