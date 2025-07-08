// components/Transition.tsx
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface TransitionProps {
  show: boolean;
  enter: string;
  enterFrom: string;
  enterTo: string;
  leave: string;
  leaveFrom: string;
  leaveTo: string;
  duration?: number;
  children: ReactNode;
}

export default function Transition({ 
  show, 
  enter, 
  enterFrom, 
  enterTo, 
  leave, 
  leaveFrom, 
  leaveTo, 
  duration = 150,
  children 
}: TransitionProps) {
  const [isShowing, setIsShowing] = useState(show);
  const [classes, setClasses] = useState("");
  
  // Referencias para los timeouts para poder limpiarlos
  const [enterTimeout, setEnterTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [leaveTimeout, setLeaveTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [hideTimeout, setHideTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Limpiar cualquier timeout anterior
    if (enterTimeout) clearTimeout(enterTimeout);
    if (leaveTimeout) clearTimeout(leaveTimeout);
    if (hideTimeout) clearTimeout(hideTimeout);
    
    if (show) {
      setIsShowing(true);
      setClasses(`${enter} ${enterFrom}`);
      const timeout = setTimeout(() => setClasses(`${enter} ${enterTo}`), 20);
      setEnterTimeout(timeout);
    } else if (isShowing) { // Solo ejecutar la animación de salida si está mostrando
      setClasses(`${leave} ${leaveFrom}`);
      const timeout1 = setTimeout(() => {
        setClasses(`${leave} ${leaveTo}`);
        const timeout2 = setTimeout(() => setIsShowing(false), duration);
        setHideTimeout(timeout2);
      }, 20);
      setLeaveTimeout(timeout1);
    }
    
    // Limpiar timeouts cuando el componente se desmonte
    return () => {
      if (enterTimeout) clearTimeout(enterTimeout);
      if (leaveTimeout) clearTimeout(leaveTimeout);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [show]);

  return isShowing ? <div className={classes}>{children}</div> : null;
}