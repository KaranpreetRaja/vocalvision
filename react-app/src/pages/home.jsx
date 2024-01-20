import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

export default function Home(){
    return(
        <div>
            <Navbar/>
            <div className="text-black">
                <div className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-text">Craft Engaging <span className='highlight'>Presentations, Lectures, and Stories</span> Effortlessly with AI-Powered Assistance</h1>
                        <Link to="/signup" className="text-black font-bold text-xl">
                            <button className='hero-btn hover:bg-blue-700 transition ease-in-out duration-300'>Get started</button>
                        </Link>
                        <p>Create dynamic content in seconds</p>
                    </div>
                </div>

                <div id='features' className='features-section'>
                    <strong style={{ color: "#ef4f1a" }}>Features</strong>
                    <h1>How we rock</h1>
                    <main className="grid-container">
                    <section className="content-creation-section card">
                        <h3>Content Creation</h3>
                        <p><strong>AI-Powered Prompts:</strong> Use AI-generated prompts to inspire and guide the creation of presentations, lectures, and stories.</p>
                        <p><strong>Creation Tools:</strong> Access an intuitive interface with creative tools to craft visually appealing and informative content based on provided prompts.</p>
                    </section>

                    <section className="content-search-section card">
                        <h3>Content Search</h3>
                        <p><strong>Search Functionality:</strong> Integrate with search engines to find relevant text, images, and AI-generated content for your presentations.</p>
                        <p><strong>Content Ranking:</strong> Implement a ranking system to prioritize search results based on relevance and creativity.</p>
                    </section>

                    <section className="ai-content-generation-section card">
                        <h3>AI Content Generation</h3>
                        <p><strong>Language and Art Generation:</strong> Utilize advanced AI techniques for generating compelling and visually appealing content based on provided prompts.</p>
                        <p><strong>Customization Options:</strong> Fine-tune the AI content generation process to align with specific storytelling or educational needs.</p>
                    </section>

                    <section className="user-experience-section card">
                        <h3>User Experience</h3>
                        <p><strong>User-Friendly Interface:</strong> Provide an intuitive interface for creating presentations, lectures, and stories with AI-generated content using prompts.</p>
                        <p><strong>Interactive Features:</strong> Incorporate interactive elements for user engagement and participation.</p>
                    </section>

                    <section className="content-retrieval-section card">
                        <h3>Content Retrieval</h3>
                        <p><strong>Search Options:</strong> Integrate with search engines to retrieve relevant prompts for creating educational content.</p>
                        <p><strong>Scoring Mechanism:</strong> Implement a scoring mechanism for ranking retrieved prompts based on relevance.</p>
                    </section>

                    <section className="user-interaction-section card">
                        <h3>User Interaction</h3>
                        <p><strong>User-Friendly Interface:</strong> Provide an intuitive interface for users to interact with the platform, customize settings, and access AI-generated results.</p>
                        <p><strong>Query Input:</strong> Allow users to input prompts for information retrieval and AI content generation.</p>
                    </section>

                    <section className="integration-api-section card">
                        <h3>Integration and API</h3>
                        <p><strong>API Support:</strong> Offer APIs for seamless integration with other creative tools and learning applications.</p>
                        <p><strong>External Integrations:</strong> Support integration with external data sources, databases, or other educational services.</p>
                    </section>

                    <section className="performance-monitoring-section card">
                        <h3>Performance Monitoring</h3>
                        <p><strong>Monitoring Tools:</strong> Provide tools for monitoring the performance of AI-generated content and user engagement over time.</p>
                        <p><strong>Automatic Updates:</strong> Implement mechanisms for automatic updates and improvements to enhance the AI-generated learning experience.</p>
                    </section>

                    <section className="support-section card">
                        <h3>Documentation and Support</h3>
                        <p><strong>User Documentation:</strong> Offer comprehensive documentation to guide users on how to make the most of the platform.</p>
                        <p><strong>Customer Support:</strong> Provide channels for users to seek assistance or inquire about the AI-generated content creation process.</p>
                    </section>
                    </main>
                </div>
            </div>
        </div>
    )
}