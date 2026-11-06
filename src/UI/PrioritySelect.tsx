import { ChevronDown } from 'lucide-react'
import type {Priority} from "../types/taskTypes.ts";

type PrioritySelectProps = {
    value: Priority
    onChange: (value: Priority) => void

}

const PrioritySelect = ({value, onChange}: PrioritySelectProps) => {
    return (
        <div>
            <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wide text-muted">Priority</span>
                <div className="relative">
                    <select
                        value={value}
                        onChange={(e) => onChange(e.target.value as Priority)}
                        className="w-full appearance-none rounded-lg border border-line bg-app px-3 py-2 pr-9 text-sm text-fg outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
                </div>
            </label>
        </div>
    );
};

export default PrioritySelect;