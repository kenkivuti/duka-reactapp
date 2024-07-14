import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image4 from "../images/image4.jpg";
import test from "../images/test.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const navigate = useNavigate();

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: number) => {
      setIndex(selectedIndex);
    };

    const handleClick = () => {
        navigate("/Products");
    };

    return (
        <>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={test}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={test}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={test}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
           <br/>
            <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className="content" style={{ flex: 1 }}>
                    <header className="header">
                        <h1 className="heading">Welcome to myduka</h1>
                    </header>
                    <main className="main">
                        <section className="hero">
                            <div className="hero-content">
                                <h2 className="hero-heading">One-stop shop for all your needs</h2>
                                <p className="hero-text">Discover a wide range of products at competitive prices.</p>
                                <button className="btn-primary" onClick={handleClick}>Explore Products</button>
                            </div>
                        </section>
                        <section className="featured-products">
                            <h2 className="section-heading">Featured Products</h2>
                            <div className="product-list" style={{ display: "flex", justifyContent: "center" }}>
                                <div className="product" style={{ margin: "10px" }}>
                                    <img src={image1} alt="Product 1" style={{ width: "200px", height: "200px", borderRadius: "50%" }} />
                                    <p className="product-name">Product 1</p>
                                    <p className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac ligula sit amet dui posuere ultrices.</p>
                                </div>
                                <div className="product" style={{ margin: "10px" }}>
                                    <img src={image2} alt="Product 2" style={{ width: "200px", height: "200px", borderRadius: "50%" }} />
                                    <p className="product-name">Product 2</p>
                                    <p className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac ligula sit amet dui posuere ultrices.</p>
                                </div>
                                <div className="product" style={{ margin: "10px" }}>
                                    <img src={test} alt="Product 3" style={{ width: "200px", height: "200px", borderRadius: "50%" }} />
                                    <p className="product-name">Product 3</p>
                                    <p className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac ligula sit amet dui posuere ultrices.</p>
                                </div>
                            </div>
                        </section>
                    </main>
                    <footer className="footer">
                        <p className="footer-text">© 2024 myduka. All rights reserved.</p>
                    </footer>
                </div>
                <br /><br />
                <div className="side-image" style={{ flex: 1 }}>
                    <img src={image4} alt="Side Image" style={{ width: "100%", height: "auto" }} />
                </div>
            </div>
        </>
    );
};

export default Home;
