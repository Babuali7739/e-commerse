import React,{useState} from 'react'
import './DescriptionBox.css'


export const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState('description'); // Track the active tab

  const handleTabClick = (tab) => {
      setActiveTab(tab); // Update active tab on click
  };
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div 
            className={`descriptionbox-nav-box ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => handleTabClick('description')}>
              Dexcription</div>
              <div
                className={`descriptionbox-nav-box ${activeTab === 'reviews' ? 'active' : ''}`}
                 onClick={() => handleTabClick('reviews')}
                >
              Reviews(130)</div>
        </div>
        <div className="descriptionbox-container">
        {activeTab === 'description' && (
                    <div className="descriptionbox-description">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nostrum minus temporibus illo quibusdam, nulla, tenetur id accusamus voluptatum laboriosam delectus. Numquam nam magnam nostrum atque neque sequi ratione quibusdam maxime quaerat dicta, enim voluptatibus veritatis itaque exercitationem eum sed temporibus eaque explicabo consectetur aperiam accusamus odit vitae placeat? Incidunt!</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae dolores labore mollitia quibusdam unde praesentium totam harum, similique vel quisquam qui molestiae incidunt, rem quasi, amet cum illo soluta laboriosam! Corporis reiciendis adipisci laborum velit eaque magnam exercitationem aliquam fugit.</p>
                    </div>
                )}
                {activeTab === 'reviews' && (
                    <div className="descriptionbox-reviews">
                        <p>Reviews will be displayed here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nostrum minus temporibus illo quibusdam, nulla, tenetur id accusamus voluptatum laboriosam delectus. Numquam nam magnam nostrum atque neque sequi ratione quibusdam maxime quaerat dicta, enim voluptatibus veritatis itaque exercitationem eum sed temporibus.</p>
                    </div>
                )}
        </div>
    </div>
  )
}
export default DescriptionBox
