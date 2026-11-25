"use client";

import { CheckCircle, AlertTriangle, XCircle, Activity, Brain, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisData {
    step1: {
        assumptions: string[];
        missingData: string[];
        sensitivityTest: string;
        confidence: "HIGH" | "MEDIUM" | "LOW";
        isFragile: boolean;
    };
    step2: {
        bestCase: string;
        expectedCase: string;
        worstCase: string;
        reversibility: string;
        regretRisk: "LOW" | "MODERATE" | "HIGH";
    };
    step3: {
        responseMode: "ANSWER" | "WARN" | "REFUSE";
    };
    step4: {
        explanation: string;
        finalContent: string;
    };
}

export function AnalysisProcess({ data }: { data: AnalysisData }) {
    const getConfidenceColor = (conf: string) => {
        switch (conf) {
            case "HIGH": return "text-emerald-400 border-emerald-400";
            case "MEDIUM": return "text-amber-400 border-amber-400";
            case "LOW": return "text-red-500 border-red-500";
            default: return "text-gray-400";
        }
    };

    const getRegretColor = (risk: string) => {
        switch (risk) {
            case "LOW": return "text-emerald-400";
            case "MODERATE": return "text-amber-400";
            case "HIGH": return "text-red-500";
            default: return "text-gray-400";
        }
    };

    const getModeColor = (mode: string) => {
        switch (mode) {
            case "ANSWER": return "bg-emerald-950/30 border-emerald-500 text-emerald-400";
            case "WARN": return "bg-amber-950/30 border-amber-500 text-amber-400";
            case "REFUSE": return "bg-red-950/30 border-red-500 text-red-500";
            default: return "";
        }
    };

    return (
        <div className="w-full max-w-4xl space-y-6 font-mono text-sm animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* STEP 1: CONFIDENCE ANALYSIS */}
            <div className="border border-zinc-800 bg-zinc-950/50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4 border-b border-zinc-900 pb-2">
                    <div className="flex items-center gap-2 text-zinc-400">
                        <Brain size={18} />
                        <h2 className="uppercase tracking-widest text-xs font-bold">Step 1: Confidence Analysis</h2>
                    </div>
                    <div className={cn("px-3 py-1 text-xs border rounded uppercase font-bold", getConfidenceColor(data.step1.confidence))}>
                        Confidence: {data.step1.confidence}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-zinc-500 text-xs uppercase mb-2">Assumptions Identified</h3>
                        <ul className="list-disc list-inside text-zinc-300 space-y-1">
                            {data.step1.assumptions.map((a, i) => <li key={i}>{a}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-zinc-500 text-xs uppercase mb-2">Missing / Inferred</h3>
                        <ul className="list-disc list-inside text-zinc-400 space-y-1">
                            {data.step1.missingData.length > 0 ? data.step1.missingData.map((d, i) => <li key={i}>{d}</li>) : <li>None</li>}
                        </ul>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-900">
                    <h3 className="text-zinc-500 text-xs uppercase mb-1">Sensitivity Test</h3>
                    <p className="text-zinc-300 italic">"{data.step1.sensitivityTest}"</p>
                </div>
            </div>

            {/* STEP 2: REGRET SIMULATION */}
            <div className="border border-zinc-800 bg-zinc-950/50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4 border-b border-zinc-900 pb-2">
                    <div className="flex items-center gap-2 text-zinc-400">
                        <Activity size={18} />
                        <h2 className="uppercase tracking-widest text-xs font-bold">Step 2: Future Regret Simulation</h2>
                    </div>
                    <div className={cn("px-3 py-1 text-xs border rounded uppercase font-bold", getRegretColor(data.step2.regretRisk))}>
                        Risk: {data.step2.regretRisk}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="p-3 bg-emerald-950/10 border border-emerald-900/30 rounded">
                        <div className="text-xs text-emerald-600 mb-1 uppercase">Best Case</div>
                        <div className="text-zinc-300">{data.step2.bestCase}</div>
                    </div>
                    <div className="p-3 bg-zinc-900/40 border border-zinc-800 rounded">
                        <div className="text-xs text-zinc-500 mb-1 uppercase">Expected</div>
                        <div className="text-zinc-300">{data.step2.expectedCase}</div>
                    </div>
                    <div className="p-3 bg-red-950/10 border border-red-900/30 rounded">
                        <div className="text-xs text-red-600 mb-1 uppercase">Worst Case</div>
                        <div className="text-zinc-300">{data.step2.worstCase}</div>
                    </div>
                </div>
                <div className="flex gap-4 text-xs text-zinc-500">
                    <span>Reversibility: <span className="text-zinc-300">{data.step2.reversibility}</span></span>
                </div>
            </div>

            {/* STEP 3 & 4: FINAL DECISION */}
            <div className={cn("border p-8 rounded-lg shadow-2xl transition-all duration-700", getModeColor(data.step3.responseMode))}>
                <div className="flex items-center gap-3 mb-6">
                    {data.step3.responseMode === 'ANSWER' && <CheckCircle className="w-8 h-8" />}
                    {data.step3.responseMode === 'WARN' && <AlertTriangle className="w-8 h-8" />}
                    {data.step3.responseMode === 'REFUSE' && <ShieldAlert className="w-8 h-8" />}

                    <div>
                        <div className="text-xs opacity-70 uppercase tracking-widest">Decision Engine Output</div>
                        <div className="text-3xl font-black tracking-tighter">{data.step3.responseMode}</div>
                    </div>
                </div>

                <div className="prose prose-invert max-w-none">
                    <h3 className="text-lg font-bold mb-2">Restraint Logic Explanation</h3>
                    <p className="opacity-90 leading-relaxed mb-6">{data.step4.explanation}</p>

                    <div className="bg-black/40 p-6 rounded border border-white/10">
                        <h3 className="text-xs font-bold uppercase opacity-50 mb-3">System Response</h3>
                        <p className="text-lg leading-relaxed whitespace-pre-wrap font-sans">{data.step4.finalContent}</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
