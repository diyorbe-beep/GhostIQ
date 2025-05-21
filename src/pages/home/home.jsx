import React, { useEffect, useState } from 'react';
import "./home.scss";
import { ArrowRight } from 'lucide-react';
import imgs from "../../assets/index.js";
import Statistika from '../../components/statistika/statistika.jsx';
import UseStateChatr from '../../components/UserStatsChart/UserStatsChart.jsx';


const AnimatedNumber = ({ end }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const endNum = parseInt(end);
        const duration = 2000;
        const increment = endNum / (duration / 50);
        const interval = setInterval(() => {
            start += increment;
            if (start >= endNum) {
                start = endNum;
                clearInterval(interval);
            }
            setCount(Math.floor(start));
        }, 50);
    }, [end]);

    return <h4>{count.toLocaleString()}</h4>;
};

const Home = () => {
    return (
        <div>
            <div className="wrapper">
                <div className="home_content">
                    <div className="home_left">
                        <h1>Fanlar bo'yicha <br /> test ishlang!</h1>
                        <button class="animated-button">
                            <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                ></path>
                            </svg>
                            <span class="text">Test ishlash</span>
                            <span class="circle"></span>
                            <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="home_right card-animate">
                        <div className="home_right_1">
                            <img src={imgs.cal} alt="icon" className="icon-anim" />
                            <h2>Fanlar</h2>
                        </div>
                        <div className="home_right_2">
                            <AnimatedNumber end="50000" />
                            <h4>Test ishlovchilar</h4>
                        </div>
                    </div>
                </div>
                <Statistika />
                <UseStateChatr />
            </div>
        </div>
    );
}

export default Home;