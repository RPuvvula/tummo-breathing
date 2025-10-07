import React, { useState } from 'react';
import { tummoData } from '../tummo-data';
import './TummoBreathing.css';

const TummoBreathing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('steps');

  const renderList = (items: string[]) => (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );

  return (
    <div className="tummo-container">
      <header className="header">
        <h1>{tummoData.exerciseName}</h1>
        <p className="intro-text">{tummoData.sampleTextIntro}</p>
      </header>

      <div className="main-content">
        <div className="left-panel">
          <div className="tabs">
            <button onClick={() => setActiveTab('steps')} className={activeTab === 'steps' ? 'active' : ''}>Steps</button>
            <button onClick={() => setActiveTab('benefits')} className={activeTab === 'benefits' ? 'active' : ''}>Benefits</button>
            <button onClick={() => setActiveTab('precautions')} className={activeTab === 'precautions' ? 'active' : ''}>Precautions</button>
            <button onClick={() => setActiveTab('mistakes')} className={activeTab === 'mistakes' ? 'active' : ''}>Common Mistakes</button>
          </div>
          <div className="tab-content">
            {activeTab === 'steps' && <div className="card">{renderList(tummoData.steps)}</div>}
            {activeTab === 'benefits' && <div className="card">{renderList(tummoData.benefits)}</div>}
            {activeTab === 'precautions' && <div className="card">{renderList(tummoData.precautions)}</div>}
            {activeTab === 'mistakes' && <div className="card">{renderList(tummoData.commonMistakes)}</div>}
          </div>

          <div className="card">
            <h2>Description</h2>
            <p>{tummoData.description}</p>
          </div>

          <div className="card">
            <h2>Progression Path</h2>
            <p><strong>Beginner:</strong> {tummoData.progressionPath.beginner}</p>
            <p><strong>Intermediate:</strong> {tummoData.progressionPath.intermediate}</p>
            <p><strong>Advanced:</strong> {tummoData.progressionPath.advanced}</p>
          </div>

        </div>

        <div className="right-panel">
            <div className="card user-profile">
                <h2>User Profile</h2>
                <p><strong>Name:</strong> {tummoData.userProfile.name}</p>
                <p><strong>Experience:</strong> {tummoData.userProfile.experienceLevel}</p>
                <p><strong>Goals:</strong> {tummoData.userProfile.goals.join(', ')}</p>
            </div>

            <div className="card">
                <h2>Details</h2>
                <p><strong>Duration:</strong> {tummoData.durationMinutes} minutes</p>
                <p><strong>Difficulty:</strong> {tummoData.difficulty}</p>
                <p><strong>Tags:</strong> {tummoData.tags.join(', ')}</p>
            </div>

            <div className="card">
                <h2>Equipment Needed</h2>
                {renderList(tummoData.equipmentNeeded)}
            </div>

            <div className="card">
                <h2>Related Practices</h2>
                {renderList(tummoData.relatedPractices)}
            </div>
        </div>
      </div>

        <div className="image-gallery">
            {tummoData.imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Tummo visualization ${index + 1}`} />
            ))}
        </div>

      <footer className="footer">
        <div className="card">
            <h2>References</h2>
            <ul>
            {tummoData.references.map((ref, index) => (
                <li key={index}>
                <em>{ref.title}</em> by {ref.author} ({ref.year})
                </li>
            ))}
            </ul>
        </div>
        <p>Last updated: {new Date(tummoData.lastUpdated).toLocaleDateString()}</p>
      </footer>
    </div>
  );
};

export default TummoBreathing;