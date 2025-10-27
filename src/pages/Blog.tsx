import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
import homestayImage from "@/assets/homestay-featured.jpg";
import bikeImage from "@/assets/bike-featured.jpg";
import experienceImage from "@/assets/experience-featured.jpg";

const Blog = () => {
  const posts = [
    {
      image: homestayImage,
      title: "10 Hidden Gems: Homestays in Himachal Pradesh",
      excerpt: "Discover authentic mountain living in these carefully curated homestays across Himachal.",
      author: "Priya Sharma",
      date: "March 15, 2025",
      category: "Stays",
    },
    {
      image: bikeImage,
      title: "The Ultimate Leh-Ladakh Bike Trip Guide",
      excerpt: "Everything you need to know for your dream motorcycle journey through the Himalayas.",
      author: "Rahul Mehta",
      date: "March 12, 2025",
      category: "Bikes",
    },
    {
      image: experienceImage,
      title: "5 Unique Cultural Experiences in Rajasthan",
      excerpt: "Immerse yourself in Rajasthani culture through these authentic local experiences.",
      author: "Anjali Verma",
      date: "March 10, 2025",
      category: "Experiences",
    },
    {
      image: homestayImage,
      title: "Kerala Backwaters: A Traveler's Paradise",
      excerpt: "Navigate through the serene backwaters and discover hidden homestays along the way.",
      author: "Suresh Kumar",
      date: "March 8, 2025",
      category: "Travel",
    },
    {
      image: bikeImage,
      title: "Road Tripping Through Goa: Best Routes",
      excerpt: "Explore Goa beyond the beaches with these scenic driving routes.",
      author: "Maria D'Souza",
      date: "March 5, 2025",
      category: "Cars",
    },
    {
      image: experienceImage,
      title: "Yoga Retreats in Rishikesh: A Complete Guide",
      excerpt: "Find your inner peace with our guide to the best yoga experiences in Rishikesh.",
      author: "Amit Singh",
      date: "March 3, 2025",
      category: "Experiences",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Marquee />
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Xplowing Travel Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Stories, guides, and inspiration for your next Indian adventure
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 py-16 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect rounded-2xl overflow-hidden hover-lift cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
