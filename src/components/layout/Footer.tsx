import { Heart, Facebook, Instagram, Linkedin, Mail, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';



export function Footer() {
  return (
    <footer className="gradient-footer text-white font-['Playfair_Display']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-primary fill-current" />
              <span className="text-xl font-bold">Shop2Give</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Buy with purpose. Give with heart.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <X className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors">How it works</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/partner" className="text-gray-300 hover:text-white transition-colors">Partner</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/gdpr" className="text-gray-300 hover:text-white transition-colors">GDPR</Link></li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Language</h4>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-1">
                  🇺🇸 EN
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-1">
                  🇳🇱 NL
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 flex justify-between items-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Shop2Give. All rights reserved.</p>
          <a 
            href="https://bolt.new/?rid=dm8ttl" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition-transform hover:scale-105"
            aria-label="Built with Bolt.new"
          >
            <img 
              src="/bolt-white_circle_360x360.png" 
              alt="Built with Bolt.new" 
              className="w-20 h-20" 
            />
          </a>
        </div>
      </div>
    </footer>
  );
}