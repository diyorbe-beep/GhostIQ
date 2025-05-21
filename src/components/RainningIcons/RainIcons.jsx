import React, { useEffect, useState } from "react";
import { BookOpen, FlaskConical, Calculator, Globe, Atom } from "lucide-react";
import "./RainIcons.scss";

const icons = [BookOpen, FlaskConical, Calculator, Globe, Atom];

const IconRain = () => {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDrop = {
        id: Date.now(),
        Icon: icons[Math.floor(Math.random() * icons.length)],
        left: Math.random() * 100, // %
        size: 20 + Math.random() * 20, // px
        delay: Math.random() * 3 // s
      };
      setDrops((prev) => [...prev.slice(-15), newDrop]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="icon-rain-wrapper">
      {drops.map(({ id, Icon, left, size, delay }) => (
        <Icon
          key={id}
          className="rain-icon"
          style={{ left: `${left}%`, fontSize: `${size}px`, animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
};

export default IconRain;
