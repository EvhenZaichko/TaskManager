import { useEffect } from 'react'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../store'
import { hideToast } from '../store/toastSlice'

const toastStyles = {
    success: {
        icon: CheckCircle2,
        accent: 'text-emerald-400',
        bar: 'bg-emerald-400',
    },
    error: {
        icon: XCircle,
        accent: 'text-red-400',
        bar: 'bg-red-400',
    },
    info: {
        icon: Info,
        accent: 'text-accent',
        bar: 'bg-accent',
    },
}

const Toast = () => {
    const { isOpen, message, type } = useAppSelector((state) => state.toast)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isOpen) return
        const timer = setTimeout(() => dispatch(hideToast()), 3000)
        return () => clearTimeout(timer)
    }, [isOpen, message, dispatch])

    const { icon: Icon, accent, bar } = toastStyles[type]

    return (
        <div
            className={`fixed left-1/2 top-20 z-[60] w-80 max-w-[calc(100vw-3rem)] -translate-x-1/2 transition-all duration-300 ${
                isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
            }`}
        >
            <div className="relative flex items-start gap-3 overflow-hidden rounded-xl border border-line bg-surface py-3 pl-4 pr-10 shadow-lg shadow-black/40">
                <span className={`absolute inset-y-0 left-0 w-1 ${bar}`} />

                <Icon size={20} className={`mt-0.5 shrink-0 ${accent}`} />

                <p className="text-sm leading-relaxed text-fg">{message}</p>

                <button
                    type="button"
                    onClick={() => dispatch(hideToast())}
                    className="absolute right-2 top-2 rounded-md p-1 text-muted transition-colors hover:bg-surface-hover hover:text-fg"
                    aria-label="Close"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    )
}

export default Toast