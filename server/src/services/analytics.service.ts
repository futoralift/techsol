import {
  User,
  Service,
  Project,
  Testimonial,
  Blog,
  Contact,
  Newsletter,
  Media,
} from '../models';

export interface AnalyticsOverview {
  users: { total: number; admins: number; clients: number; verified: number };
  services: { total: number; active: number };
  projects: { total: number; published: number; featured: number };
  testimonials: { total: number; published: number };
  blogs: { total: number; published: number };
  contacts: { total: number; new: number; read: number; replied: number };
  newsletter: { total: number; active: number };
  media: { total: number };
}

export const getAnalyticsOverview = async (): Promise<AnalyticsOverview> => {
  const [
    totalUsers,
    adminUsers,
    clientUsers,
    verifiedUsers,
    totalServices,
    activeServices,
    totalProjects,
    publishedProjects,
    featuredProjects,
    totalTestimonials,
    publishedTestimonials,
    totalBlogs,
    publishedBlogs,
    totalContacts,
    newContacts,
    readContacts,
    repliedContacts,
    totalNewsletter,
    activeNewsletter,
    totalMedia,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: 'admin' }),
    User.countDocuments({ role: 'client' }),
    User.countDocuments({ isVerified: true }),
    Service.countDocuments(),
    Service.countDocuments({ isActive: true }),
    Project.countDocuments(),
    Project.countDocuments({ isPublished: true }),
    Project.countDocuments({ isFeatured: true }),
    Testimonial.countDocuments(),
    Testimonial.countDocuments({ isPublished: true }),
    Blog.countDocuments(),
    Blog.countDocuments({ isPublished: true }),
    Contact.countDocuments(),
    Contact.countDocuments({ status: 'new' }),
    Contact.countDocuments({ status: 'read' }),
    Contact.countDocuments({ status: 'replied' }),
    Newsletter.countDocuments(),
    Newsletter.countDocuments({ isActive: true }),
    Media.countDocuments(),
  ]);

  return {
    users: {
      total: totalUsers,
      admins: adminUsers,
      clients: clientUsers,
      verified: verifiedUsers,
    },
    services: { total: totalServices, active: activeServices },
    projects: {
      total: totalProjects,
      published: publishedProjects,
      featured: featuredProjects,
    },
    testimonials: { total: totalTestimonials, published: publishedTestimonials },
    blogs: { total: totalBlogs, published: publishedBlogs },
    contacts: {
      total: totalContacts,
      new: newContacts,
      read: readContacts,
      replied: repliedContacts,
    },
    newsletter: { total: totalNewsletter, active: activeNewsletter },
    media: { total: totalMedia },
  };
};

export const getRecentContacts = async (limit = 5) => {
  return Contact.find().sort({ createdAt: -1 }).limit(limit);
};

export const getRecentUsers = async (limit = 5) => {
  return User.find().sort({ createdAt: -1 }).limit(limit).select('-password');
};
