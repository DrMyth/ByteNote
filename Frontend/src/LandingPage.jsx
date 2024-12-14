import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, 
  Clock, 
  BookOpen, 
  Archive, 
  Rocket, 
  Lightbulb, 
  MoreVertical,
  Edit2, 
  Trash2, 
  Share2, 
  Eye,
  Search,
  Plus
} from 'lucide-react';

// Enhanced mock data with more detailed project information
const mockProjects = [
  { 
    id: 1, 
    title: 'AI Product Roadmap', 
    icon: '🤖',
    content: 'Comprehensive strategy for integrating AI features across our product line. Key focus areas include machine learning models, user experience, and ethical AI implementation.',
    tags: ['AI', 'Strategy', 'Product'],
    lastUpdated: '2 hours ago',
    color: 'bg-blue-50',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-200'
  },
  { 
    id: 2, 
    title: 'Design System Evolution', 
    icon: '🎨',
    content: 'Redesigning our core design system to improve consistency, accessibility, and developer experience. Focusing on component modularity and design token implementation.',
    tags: ['Design', 'UI/UX', 'System'],
    lastUpdated: 'Yesterday',
    color: 'bg-purple-50',
    textColor: 'text-purple-800',
    borderColor: 'border-purple-200'
  },
  { 
    id: 3, 
    title: 'Personal Growth Tracker', 
    icon: '📈',
    content: 'Developing a comprehensive personal development framework. Includes goal setting, skill tracking, learning objectives, and quarterly review mechanisms.',
    tags: ['Personal Development', 'Goals'],
    lastUpdated: '3 days ago',
    color: 'bg-green-50',
    textColor: 'text-green-800',
    borderColor: 'border-green-200'
  },
  { 
    id: 4, 
    title: 'Startup Pitch Deck', 
    icon: '🚀',
    content: 'Crafting a compelling narrative for our startup\'s vision, market opportunity, product strategy, and future roadmap. Preparing for investor presentations.',
    tags: ['Startup', 'Pitch', 'Fundraising'],
    lastUpdated: '1 week ago',
    color: 'bg-orange-50',
    textColor: 'text-orange-800',
    borderColor: 'border-orange-200'
  }
];

const UltraModernSecondBrain = () => {
  const [activeSection, setActiveSection] = useState('all-notes');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode toggle effect
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const renderSidebar = () => (
    <div className="
      w-72 
      bg-white 
      dark:bg-gray-900 
      border-r 
      border-gray-200 
      dark:border-gray-800 
      h-screen 
      flex 
      flex-col 
      shadow-lg
    ">
      {/* App Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="
              w-12 
              h-12 
              bg-gradient-to-br 
              from-blue-500 
              to-purple-600 
              rounded-full 
              flex 
              items-center 
              justify-center 
              shadow-md
            ">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h1 className="
              text-2xl 
              font-bold 
              text-gray-800 
              dark:text-gray-100
            ">
              NeuroPro
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {[
          { icon: LayoutGrid, label: 'All Notes', section: 'all-notes' },
          { icon: Clock, label: 'Watch Later', section: 'watch-later' },
          { icon: BookOpen, label: 'Reading List', section: 'reading-list' },
          { icon: Archive, label: 'Archived', section: 'archived' },
          { icon: Rocket, label: 'Projects', section: 'projects' }
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveSection(item.section)}
            className={`
              w-full 
              flex 
              items-center 
              space-x-3 
              p-3 
              rounded-lg 
              transition-all 
              duration-200 
              ${activeSection === item.section 
                ? 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}
            `}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );

  const ProjectCard = ({ project }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
      <div 
        className={`
          ${project.color} 
          ${project.borderColor}
          border 
          rounded-2xl 
          p-5 
          relative 
          transform 
          transition-all 
          duration-300 
          hover:scale-[1.02] 
          hover:shadow-lg
        `}
      >
        {/* Project Actions Dropdown */}
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="
              text-gray-500 
              hover:bg-gray-200 
              rounded-full 
              p-2 
              transition-colors
            "
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          
          {isMenuOpen && (
            <div className="
              absolute 
              right-0 
              top-full 
              mt-2 
              w-48 
              bg-white 
              dark:bg-gray-800 
              border 
              border-gray-200 
              dark:border-gray-700 
              rounded-lg 
              shadow-lg 
              z-10
            ">
              <button className="
                w-full 
                flex 
                items-center 
                space-x-2 
                p-3 
                hover:bg-gray-100 
                dark:hover:bg-gray-700 
                text-sm
              ">
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button className="
                w-full 
                flex 
                items-center 
                space-x-2 
                p-3 
                hover:bg-gray-100 
                dark:hover:bg-gray-700 
                text-sm
              ">
                <Trash2 className="w-4 h-4 text-red-500" />
                <span className="text-red-500">Delete</span>
              </button>
              <button className="
                w-full 
                flex 
                items-center 
                space-x-2 
                p-3 
                hover:bg-gray-100 
                dark:hover:bg-gray-700 
                text-sm
              ">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="
                w-full 
                flex 
                items-center 
                space-x-2 
                p-3 
                hover:bg-gray-100 
                dark:hover:bg-gray-700 
                text-sm
              ">
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </button>
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="text-4xl">{project.icon}</div>
          <div>
            <h3 className={`
              text-lg 
              font-bold 
              ${project.textColor}
            `}>
              {project.title}
            </h3>
            <p className="
              text-sm 
              text-gray-600 
              dark:text-gray-400 
              mt-1 
              line-clamp-2
            ">
              {project.content}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex space-x-2 mt-3">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className="
                px-2 
                py-1 
                bg-white 
                dark:bg-gray-800 
                text-xs 
                rounded-full 
                text-gray-700 
                dark:text-gray-300
                border
                border-gray-200
                dark:border-gray-700
              "
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Last Updated */}
        <div className="
          text-xs 
          text-gray-500 
          dark:text-gray-500 
          mt-3 
          text-right
        ">
          {project.lastUpdated}
        </div>
      </div>
    );
  };

  const renderMainContent = () => {
    const filteredProjects = mockProjects.filter(project => 
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="
        flex-1 
        bg-gray-50 
        dark:bg-gray-800 
        p-8 
        overflow-y-auto
      ">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="
            text-3xl 
            font-bold 
            text-gray-800 
            dark:text-gray-100
          ">
            {activeSection === 'all-notes' ? 'All Notes' : 'My Projects'}
          </h1>
          <button className="
            bg-blue-500 
            text-white 
            p-3 
            rounded-full 
            hover:bg-blue-600 
            transition-colors 
            shadow-md 
            flex 
            items-center 
            space-x-2
          ">
            <Plus className="w-5 h-5" />
            <span className="text-sm font-medium">New Project</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="
              w-full 
              p-3 
              pl-10 
              border 
              border-gray-300 
              dark:border-gray-700 
              rounded-lg 
              bg-white 
              dark:bg-gray-900 
              text-gray-800 
              dark:text-gray-100 
              focus:ring-2 
              focus:ring-blue-500 
              outline-none
            "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="
            absolute 
            left-3 
            top-1/2 
            transform 
            -translate-y-1/2 
            text-gray-400 
            dark:text-gray-500 
            w-5 
            h-5
          " />
        </div>

        {/* Projects Grid */}
        <div className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          lg:grid-cols-3 
          gap-6
        ">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`
      flex 
      h-screen 
      overflow-hidden 
      ${isDarkMode ? 'dark' : ''}
    `}>
      {renderSidebar()}
      {renderMainContent()}
    </div>
  );
};

export default UltraModernSecondBrain;