// Create Angular App
var app = angular.module('portfolioApp', []);

// Main Controller
app.controller('MainController', function($scope, $interval, $timeout) {
  var vm = this;

  // Profile Data
  vm.profile = {
    name: 'Akanksha Jharia',
    tagline: 'A passionate developer and machine learning enthusiast creating modern, impactful solutions.',
    expertise: 'Frontend • Machine Learning • Databases',
    bio: 'I am a developer experienced in frontend technologies, machine learning, and database management. My goal is to build elegant, performant, and user-centric products.',
    location: 'India',
    email: 'akanksha.jharia23@pcu.edu.in',
    github: 'https://github.com/CrystalSnowflake',
    githubDisplay: 'github.com/CrystalSnowflake',
    linkedin: 'https://www.linkedin.com/in/akanksha-jharia-7262b0329/',
    linkedinDisplay: 'linkedin.com/in/akanksha-jharia-7262b0329'
  };

  // Current Year
  vm.currentYear = new Date().getFullYear();
  vm.lastUpdated = new Date();

  // Live Clock - Angular Feature
  vm.currentTime = new Date();
  $interval(function() {
    vm.currentTime = new Date();
  }, 1000);

  // Profile Views Counter - Angular Feature
  vm.profileViews = Math.floor(Math.random() * 500) + 100;
  $interval(function() {
    if (Math.random() > 0.7) {
      vm.profileViews++;
    }
  }, 5000);

  // Projects Data
  vm.projects = [
    {
      id: 1,
      title: 'URNotAlone',
      subtitle: 'Multi-faceted support app (2019)',
      tag: 'Personal Project',
      date: '2019',
      description: 'Successfully developed a fully functional application from conception to launch. Integrated multiple features to provide a multi-faceted support system. Showcased the project at an expo, gaining exposure and feedback on its design and functionality.',
      tech: 'App Development',
      likes: 0
    },
    {
      id: 2,
      title: 'My Life is a Dream',
      subtitle: 'Retro-style psychological game',
      tag: 'Personal Project',
      date: '2019',
      description: 'Created a retro-style psychological game, "My Life is a Dream," to explore narrative and gameplay mechanics.',
      tech: 'Game Development',
      likes: 0
    },
    {
      id: 3,
      title: 'PCOS Detection Model',
      subtitle: 'AI model for PCOS diagnosis',
      tag: 'Machine Learning',
      date: '2023 - 24',
      description: 'Led a research team of three to develop an AI prediction model for PCOS diagnosis. Managed the development and training of a YOLOv11 model to scan trans-vaginal ultrasound images, successfully detecting and visualizing ovarian abnormalities. Led the research paper\'s creation.',
      tech: 'Python, YOLOv11, AI',
      likes: 0
    },
    {
      id: 4,
      title: 'Endometriosis Detection Model',
      subtitle: 'AI model for endometriosis detection',
      tag: 'Machine Learning',
      date: '2024',
      description: 'Directed a three-person team in developing an AI model for the early detection of endometriosis. Included a computer vision model to analyze laparoscopic scans and a custom recommendation system for personalized treatment suggestions.',
      tech: 'Computer Vision, Recommendation Systems',
      likes: 0
    },
    {
      id: 5,
      title: 'MetaParks',
      subtitle: 'Interactive national parks website',
      tag: 'Web Development',
      date: '2023',
      description: 'Led a 3-person team to develop and launch a website showcasing the top national parks of India. Engineered a custom interactive map of India on the homepage, allowing users to navigate to specific states with a single click. Managed content and structure for a user-friendly interface.',
      tech: 'Web Development, Interactive Maps',
      likes: 0
    }
  ];

  // Filter state
  vm.filter = 'all';
  vm.filteredProjects = vm.projects.slice();

  // Filter Projects - Angular Feature
  vm.filterProjects = function(category) {
    vm.filter = category;
    if (category === 'all') {
      vm.filteredProjects = vm.projects.slice();
    } else {
      vm.filteredProjects = vm.projects.filter(function(project) {
        return project.tag === category;
      });
    }
  };

  // Count projects by tag
  vm.countByTag = function(tag) {
    return vm.projects.filter(function(project) {
      return project.tag === tag;
    }).length;
  };

  // Skills Data
  vm.skills = [
    { name: 'Frontend', percentage: 80 },
    { name: 'Machine Learning', percentage: 40 },
    { name: 'Databases & Tools', percentage: 90 }
  ];

  // Website Feedback - Angular Feature
  vm.newFeedback = { name: '', rating: 5 };
  vm.feedbacks = [];
  vm.feedbackStatus = '';
  
  vm.addFeedback = function() {
    if (vm.newFeedback.name && vm.newFeedback.name.trim() !== '') {
      vm.feedbacks.push({
        name: vm.newFeedback.name,
        rating: parseInt(vm.newFeedback.rating),
        timestamp: new Date()
      });
      vm.feedbackStatus = 'Thank you for your feedback!';
      vm.newFeedback = { name: '', rating: 5 };
      
      $timeout(function() {
        vm.feedbackStatus = '';
      }, 3000);
    } else {
      vm.feedbackStatus = 'Please enter your name';
      $timeout(function() {
        vm.feedbackStatus = '';
      }, 2000);
    }
  };
  
  vm.getAverageRating = function() {
    if (vm.feedbacks.length === 0) return 0;
    var sum = 0;
    for (var i = 0; i < vm.feedbacks.length; i++) {
      sum += vm.feedbacks[i].rating;
    }
    return (sum / vm.feedbacks.length).toFixed(1);
  };

  // Modal State
  vm.modalOpen = false;
  vm.selectedProject = {};

  vm.openModal = function(project) {
    vm.selectedProject = {
      id: project.id,
      title: project.title,
      date: project.date,
      description: project.description,
      tech: project.tech,
      likes: project.likes
    };
    vm.modalOpen = true;
    document.body.style.overflow = 'hidden';
  };

  vm.closeModal = function() {
    vm.modalOpen = false;
    document.body.style.overflow = '';
  };

  // Like Project - Angular Feature
  vm.likeProject = function() {
    if (vm.selectedProject && vm.selectedProject.id) {
      for (var i = 0; i < vm.projects.length; i++) {
        if (vm.projects[i].id === vm.selectedProject.id) {
          vm.projects[i].likes++;
          vm.selectedProject.likes = vm.projects[i].likes;
          break;
        }
      }
    }
  };

  // Contact Form - Angular Feature
  vm.contactForm = {
    name: '',
    email: '',
    message: ''
  };
  vm.contactFormStatus = '';
  vm.messages = [];

  vm.submitContactForm = function() {
    if (vm.contactForm.name && vm.contactForm.email && vm.contactForm.message) {
      vm.messages.push({
        name: vm.contactForm.name,
        email: vm.contactForm.email,
        message: vm.contactForm.message,
        timestamp: new Date()
      });
      
      vm.contactFormStatus = 'Message sent successfully!';
      vm.contactForm = { name: '', email: '', message: '' };
      
      $timeout(function() {
        vm.contactFormStatus = '';
      }, 3000);
    }
  };

  // Copy Email
  vm.copyButtonText = 'Copy Email';
  vm.copyEmail = function() {
    var email = vm.profile.email;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(function() {
        vm.copyButtonText = 'Copied!';
        $timeout(function() {
          vm.copyButtonText = 'Copy Email';
        }, 1500);
      }).catch(function() {
        vm.copyButtonText = 'Copy failed';
        $timeout(function() {
          vm.copyButtonText = 'Copy Email';
        }, 1500);
      });
    }
  };

  // Download Resume
  vm.downloadResume = function() {
    var url = 'Akanksha_Jharia.pdf';
    window.open(url, 'Akanksha_Jharia.pdf');
  };

  // Theme Toggle
  vm.currentTheme = 'dark';
  vm.toggleTheme = function() {
    var root = document.documentElement;
    vm.currentTheme = vm.currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', vm.currentTheme);
  };

  // Mobile Menu Toggle
  vm.mobileMenuOpen = false;
  vm.toggleMobileMenu = function() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    
    vm.mobileMenuOpen = !vm.mobileMenuOpen;
    
    if (vm.mobileMenuOpen) {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.right = '1rem';
      nav.style.top = '62px';
      nav.style.background = 'rgba(11,11,11,0.95)';
      nav.style.padding = '0.5rem';
      nav.style.borderRadius = '10px';
      nav.style.zIndex = '99';
    } else {
      nav.style.display = '';
      nav.style.flexDirection = '';
      nav.style.position = '';
      nav.style.right = '';
      nav.style.top = '';
      nav.style.background = '';
      nav.style.padding = '';
      nav.style.borderRadius = '';
      nav.style.zIndex = '';
    }
  };

  // Smooth Scroll
  vm.scrollTo = function(id) {
    var element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Close mobile menu if open
      if (vm.mobileMenuOpen && window.innerWidth < 900) {
        vm.toggleMobileMenu();
      }
    }
  };

  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && vm.modalOpen) {
      $scope.$apply(function() {
        vm.closeModal();
      });
    }
  });

  // Initialize theme
  var root = document.documentElement;
  root.setAttribute('data-theme', 'dark');
  vm.currentTheme = 'dark';

  // Initialize skill bars animation
  $timeout(function() {
    var spans = document.querySelectorAll('.progress span');
    for (var i = 0; i < spans.length; i++) {
      (function(span, index) {
        span.style.width = '0%';
        span.textContent = '';
        
        $timeout(function() {
          var pct = span.getAttribute('aria-valuenow') || '0';
          span.style.width = pct + '%';
          span.textContent = pct + '%';
        }, 120 + (index * 80));
      })(spans[i], i);
    }
  }, 100);

});