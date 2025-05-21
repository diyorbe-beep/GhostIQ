import React, { useState } from 'react';
import "./sciences.scss";
import imgs from "../../assets/index.js";
import Navbar from '../../components/navbar/navbar.jsx';

const Sciences = () => {
    const [activeCard, setActiveCard] = useState(null);

    const SciencesCard = [
        { title: "Matematika", icon: imgs.Math },
        { title: "Ona Tili", icon: imgs.onaTili },
        { title: "Tarix", icon: imgs.history },
        { title: "Fizika", icon: imgs.Fizika },
        { title: "Kimyo", icon: imgs.chemistry },
        { title: "Geometry", icon: imgs.Goemetry },
    ];


    const handleMouseMove = (e, index) => {
        const card = cardRefs.current[index];
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;

        // Kursorga qarab soya o'zgarishi
        const shadowX = (x - centerX) / 10;
        const shadowY = (y - centerY) / 10;
        card.style.boxShadow = `${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.2)`;
    };

    const handleMouseLeave = (index) => {
        const card = cardRefs.current[index];
        if (card) {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        }
    };

    const handleCardClick = (index) => {
        setActiveCard(index === activeCard ? null : index);
    };

    return (
        <div className="wrapper">
            <Navbar />
            <div className="sciences-wrapper">
                <div className="sciences-header">
                    <h1 className="sciences-title">Fanlar</h1>
                    <div className="title-decoration"></div>
                </div>

                <div className='sciences-grid'>
                    {SciencesCard.map((item, index) => (
                        <div
                            key={index}
                            className={`sciences-card ${activeCard === index ? 'active' : ''}`}
                            onClick={() => handleCardClick(index)}
                            style={{ '--delay': `${index * 0.1}s` }}
                        >
                            <div className="card-inner">
                                <img
                                    src={item.icon}
                                    alt={item.title}
                                    className="card-icon"
                                />
                                <h2 className="card-title">{item.title}</h2>
                                <div className="card-overlay"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sciences;