import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, ShoppingCart, TrendingUp } from 'lucide-react';
import { LoginForm } from "./login-form.js"
import { FloatingIconsAnimation } from "@/components/animation"

export function LoginPage() {
  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r overflow-hidden">
          {/* Pink Background */}
          <div className="absolute inset-0 bg-primary" />
          
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full animate-bounce-slow"></div>
            <div className="absolute -bottom-40 -left-40 w-60 h-60 bg-white/5 rounded-full animate-float"></div>
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Shop2Give
          </div>
          {/* 3D Animation Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] flex items-center justify-center">
              <FloatingIconsAnimation
                width="100%"
                height="100%"
                centerIcon={Heart}
                centerIconSize={20}
                centerIconColor="secondary"
                centerIconFill={true}
                centerIconRotate={true}
                showConnectingLines={true}
                className="w-full h-full"
                icons={[
                  {
                    icon: ShoppingBag,
                    color: 'secondary',
                    size: 8,
                    position: 'top-left',
                    delay: 0
                  },
                  {
                    icon: ShoppingBag,
                    color: 'secondary',
                    size: 10,
                    position: 'bottom-right',
                    delay: 0.5
                  },
                  {
                    icon: ShoppingCart,
                    color: 'secondary',
                    size: 12,
                    position: 'center-right',
                    delay: 0.2
                  },
                  {
                    icon: TrendingUp,
                    color: 'secondary',
                    size: 10,
                    position: 'top-right',
                    delay: 0.5
                  },
                  {
                    icon: Heart,
                    color: 'secondary',
                    size: 8,
                    position: 'bottom-left',
                    delay: 1,
                    fillCurrent: true
                  }
                ]}
              />
            </div>
          </motion.div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Shop2Give has transformed how we connect donors with meaningful causes. It's more than just shopping – it's making a difference with every purchase.&rdquo;
              </p>
              <footer className="text-sm">Sarah Johnson</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials below to access your account
              </p>
            </div>
            <LoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
