// components/Transition.tsx
import { useEffect, useState } from "preact/hooks";

interface TransitionProps {
  show: boolean;
  enter: string;
  enterFrom: string;
  enterTo: string;
  leave: string;
  leaveFrom: string;
  leaveTo: string;
  duration?: number;
  children: preact.ComponentChildren;
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

  useEffect(() => {
    if (show) {
      setIsShowing(true);
      setClasses(`${enter} ${enterFrom}`);
      setTimeout(() => setClasses(`${enter} ${enterTo}`), 20);
    } else {
      setClasses(`${leave} ${leaveFrom}`);
      setTimeout(() => {
        setClasses(`${leave} ${leaveTo}`);
        setTimeout(() => setIsShowing(false), duration);
      }, 20);
    }
  }, [show]);

  return isShowing && <div class={classes}>{children}</div>;
}