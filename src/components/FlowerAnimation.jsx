import React, { useEffect } from 'react';
import './FlowerAnimation.css';

const FlowerAnimation = ({ position = 'left' }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            document.body.classList.remove("not-loaded");
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`flower-container ${position}`}>
            <div className="flowers">
                {/* Flower 1 */}
                <div className="flower flower--1">
                    <div className="flower__leafs flower__leafs--1">
                        <div className="flower__leaf flower__leaf--1"></div>
                        <div className="flower__leaf flower__leaf--2"></div>
                        <div className="flower__leaf flower__leaf--3"></div>
                        <div className="flower__leaf flower__leaf--4"></div>
                        <div className="flower__white-circle"></div>
                        <div className="flower__light flower__light--1"></div>
                        <div className="flower__light flower__light--2"></div>
                        <div className="flower__light flower__light--3"></div>
                        <div className="flower__light flower__light--4"></div>
                        <div className="flower__light flower__light--5"></div>
                        <div className="flower__light flower__light--6"></div>
                        <div className="flower__light flower__light--7"></div>
                        <div className="flower__light flower__light--8"></div>
                    </div>
                    <div className="flower__line">
                        <div className="flower__line__leaf flower__line__leaf--1"></div>
                        <div className="flower__line__leaf flower__line__leaf--2"></div>
                        <div className="flower__line__leaf flower__line__leaf--3"></div>
                        <div className="flower__line__leaf flower__line__leaf--4"></div>
                        <div className="flower__line__leaf flower__line__leaf--5"></div>
                        <div className="flower__line__leaf flower__line__leaf--6"></div>
                    </div>
                </div>

                {/* Flower 2 */}
                <div className="flower flower--2">
                    <div className="flower__leafs flower__leafs--2">
                        <div className="flower__leaf flower__leaf--1"></div>
                        <div className="flower__leaf flower__leaf--2"></div>
                        <div className="flower__leaf flower__leaf--3"></div>
                        <div className="flower__leaf flower__leaf--4"></div>
                        <div className="flower__white-circle"></div>
                        <div className="flower__light flower__light--1"></div>
                        <div className="flower__light flower__light--2"></div>
                        <div className="flower__light flower__light--3"></div>
                        <div className="flower__light flower__light--4"></div>
                        <div className="flower__light flower__light--5"></div>
                        <div className="flower__light flower__light--6"></div>
                        <div className="flower__light flower__light--7"></div>
                        <div className="flower__light flower__light--8"></div>
                    </div>
                    <div className="flower__line">
                        <div className="flower__line__leaf flower__line__leaf--1"></div>
                        <div className="flower__line__leaf flower__line__leaf--2"></div>
                        <div className="flower__line__leaf flower__line__leaf--3"></div>
                        <div className="flower__line__leaf flower__line__leaf--4"></div>
                    </div>
                </div>

                {/* Flower 3 */}
                <div className="flower flower--3">
                    <div className="flower__leafs flower__leafs--3">
                        <div className="flower__leaf flower__leaf--1"></div>
                        <div className="flower__leaf flower__leaf--2"></div>
                        <div className="flower__leaf flower__leaf--3"></div>
                        <div className="flower__leaf flower__leaf--4"></div>
                        <div className="flower__white-circle"></div>
                        <div className="flower__light flower__light--1"></div>
                        <div className="flower__light flower__light--2"></div>
                        <div className="flower__light flower__light--3"></div>
                        <div className="flower__light flower__light--4"></div>
                        <div className="flower__light flower__light--5"></div>
                        <div className="flower__light flower__light--6"></div>
                        <div className="flower__light flower__light--7"></div>
                        <div className="flower__light flower__light--8"></div>
                    </div>
                    <div className="flower__line">
                        <div className="flower__line__leaf flower__line__leaf--1"></div>
                        <div className="flower__line__leaf flower__line__leaf--2"></div>
                        <div className="flower__line__leaf flower__line__leaf--3"></div>
                        <div className="flower__line__leaf flower__line__leaf--4"></div>
                    </div>
                </div>

                <div className="grow-ans" style={{ "--d": "1.2s" }}>
                    <div className="flower__g-long">
                        <div className="flower__g-long__top"></div>
                        <div className="flower__g-long__bottom"></div>
                    </div>
                </div>

                <div className="growing-grass">
                    <div className="flower__grass flower__grass--1">
                        <div className="flower__grass--top"></div>
                        <div className="flower__grass--bottom"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--1"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--2"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--3"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--4"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--5"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--6"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--7"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--8"></div>
                        <div className="flower__grass__overlay"></div>
                    </div>
                </div>

                <div className="growing-grass">
                    <div className="flower__grass flower__grass--2">
                        <div className="flower__grass--top"></div>
                        <div className="flower__grass--bottom"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--1"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--2"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--3"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--4"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--5"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--6"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--7"></div>
                        <div className="flower__grass__leaf flower__grass__leaf--8"></div>
                        <div className="flower__grass__overlay"></div>
                    </div>
                </div>

                <div className="grow-ans" style={{ "--d": "2.4s" }}>
                    <div className="flower__g-right flower__g-right--1">
                        <div className="leaf"></div>
                    </div>
                </div>

                <div className="grow-ans" style={{ "--d": "2.8s" }}>
                    <div className="flower__g-right flower__g-right--2">
                        <div className="leaf"></div>
                    </div>
                </div>

                <div className="grow-ans" style={{ "--d": "2.8s" }}>
                    <div className="flower__g-front">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className={`flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--${i}`}>
                                <div className="flower__g-front__leaf"></div>
                            </div>
                        ))}
                        <div className="flower__g-front__line"></div>
                    </div>
                </div>

                <div className="grow-ans" style={{ "--d": "3.2s" }}>
                    <div className="flower__g-fr">
                        <div className="leaf"></div>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className={`flower__g-fr__leaf flower__g-fr__leaf--${i}`}></div>
                        ))}
                    </div>
                </div>

                {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                    <div key={i} className={`long-g long-g--${i}`}>
                        {[0, 1, 2, 3].map(j => (
                            <div key={j} className="grow-ans" style={{ "--d": `${3 + i * 0.2 + j * 0.2}s` }}>
                                <div className={`leaf leaf--${j}`}></div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlowerAnimation;
