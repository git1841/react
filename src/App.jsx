import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Navbar, Nav, Button, Card, Form, Alert, Row, Col } from 'react-bootstrap';
import { FaHeart, FaComment, FaShare, FaWhatsapp, FaFacebook, FaEnvelope, FaPhone, FaArrowUp } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Mock data for products
const products = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Produit ${i + 1}`,
    description: "Description détaillée de ce produit. Haute qualité et très demandé.",
    price: Math.floor(Math.random() * 100000) + 10000,
    image: `/media/${i + 1}.jpeg?text=Produit+${i + 1}`,
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 50),
    shares: Math.floor(Math.random() * 20),
}));

const adminCredentials = { username: "admin", password: "admin123" };

// Header Component (Navbar)
const Header = ({ isAdmin, setIsAdmin }) => (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
            <Navbar.Brand as={Link} to="/">Vente en Ligne</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Accueil</Nav.Link>
                </Nav>
                <Nav>
                    {!isAdmin ? (
                        <Button variant="outline-light" as={Link} to="/admin">Entrer en Admin</Button>
                    ) : (
                        <Button variant="outline-light" onClick={() => setIsAdmin(false)}>Quitter Admin</Button>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);

// Footer Component
const Footer = () => (
    <footer className="bg-dark text-white py-4 mt-auto">
        <Container>
            <Row>
                <Col md={4} className="text-center text-md-start">
                    <h5>Vente en Ligne</h5>
                    <p>Le meilleur endroit pour vos achats.</p>
                </Col>
                <Col md={4} className="text-center">
                    <h5>Contact</h5>
                    <p>Email: contact@venteenligne.com</p>
                    <p>Téléphone: +123456789</p>
                </Col>
                <Col md={4} className="text-center text-md-end">
                    <h5>Suivez-nous</h5>
                    <p>Facebook | WhatsApp | Email</p>
                </Col>
            </Row>
            <Row>
                <Col className="text-center mt-3">
                    <p>&copy; {new Date().getFullYear()} Vente en Ligne. Tous droits réservés.</p>
                </Col>
            </Row>
        </Container>
    </footer>
);

// Product Card Component
const ProductCard = ({ product }) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(product.likes);
    const [showContact, setShowContact] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
    };

    const formatPrice = (price) => new Intl.NumberFormat('fr-FR').format(price) + ' Ar';

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="h-100 shadow-lg">
                <Card.Body className="d-flex flex-column">
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text className="fw-bold text-success">{formatPrice(product.price)}</Card.Text>
                    <Card.Img variant="top" src={product.image} className="mb-3" />
                    <Row className="mb-3">
                        <Col>
                            <Button variant={liked ? "danger" : "outline-secondary"} onClick={handleLike} className="me-2">
                                <FaHeart /> {likes}
                            </Button>
                            <Button variant="outline-secondary" className="me-2">
                                <FaComment /> {product.comments}
                            </Button>
                            <Button variant="outline-secondary">
                                <FaShare /> {product.shares}
                            </Button>
                        </Col>
                    </Row>
                    <Button variant="success" onClick={() => setShowContact(!showContact)} className="mt-auto">
                        Acheter
                    </Button>
                    {showContact && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3">
                            <Button variant="outline-success" className="me-2"><FaWhatsapp /></Button>
                            <Button variant="outline-primary" className="me-2"><FaFacebook /></Button>
                            <Button variant="outline-secondary" className="me-2"><FaEnvelope /></Button>
                            <Button variant="outline-info"><FaPhone /></Button>
                        </motion.div>
                    )}
                </Card.Body>
            </Card>
        </motion.div>
    );
};

// Home Page (Pinterest-like with infinite scroll)
const HomePage = () => {
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [page, setPage] = useState(1);
    const productsPerPage = 9;

    useEffect(() => {
        loadMoreProducts();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loadMoreProducts = () => {
        const nextProducts = products.slice((page - 1) * productsPerPage, page * productsPerPage);
        setVisibleProducts(prev => [...prev, ...nextProducts]);
        setPage(p => p + 1);
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
            loadMoreProducts();
        }
    };

    return (
        <Container>
            <Row xs={1} md={2} lg={3} className="g-4">
                {visibleProducts.map(product => (
                    <Col key={product.id}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

// Admin Login Page
const AdminLogin = ({ setIsAdmin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === adminCredentials.username && password === adminCredentials.password) {
            setIsAdmin(true);
        } else {
            setError('Identifiants incorrects');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 w-50">
                <Card.Body>
                    <h2 className="text-center mb-4">Connexion Admin</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom d'utilisateur</Form.Label>
                            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button variant="success" type="submit" className="w-100 mb-3">Se connecter</Button>
                        <div className="text-center">
                            <Link to="/create-admin">Créer un nouveau compte admin</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

// Create Admin Page
const CreateAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }
        if (password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }
        alert(`Nouveau compte admin créé: ${username}`);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 w-50">
                <Card.Body>
                    <h2 className="text-center mb-4">Créer un compte Admin</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom d'utilisateur</Form.Label>
                            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirmer le mot de passe</Form.Label>
                            <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                            <Button variant="secondary" as={Link} to="/admin">Retour</Button>
                            <Button variant="success" type="submit">Créer le compte</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

// Product Detail Page (Orientation: Page for single product)
const ProductPage = ({ match }) => {
    const product = products.find(p => p.id === parseInt(match.params.id));

    if (!product) return <div>Produit non trouvé</div>;

    return (
        <Container className="my-5">
            <Card>
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text className="fw-bold text-success">{formatPrice(product.price)}</Card.Text>
                    <Card.Img variant="top" src={product.image} />
                    {/* Reactions and Buy buttons similar to ProductCard */}
                    {/* ... (reuse ProductCard logic if needed) */}
                </Card.Body>
            </Card>
        </Container>
    );
};

// Main App (Body: Routes and Logic)
const App = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
                <Route path="/create-admin" element={<CreateAdmin />} />
                <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;