import { features } from "./data";
import { CheckCircle, Building2 } from "lucide-react";
import { testimonials, stats } from "./data";

const Welcome = () => {
  return (
    <div className="relative z-10 flex flex-col justify-between p-12 w-full h-screen overflow-y-auto scrollbar-hide"> {/* Added scrollbar-hide class */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Safari and Chrome */
        }
      `}</style>
      
      <div>
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Propertify</h1>
            <p className="text-blue-100">Property Management Platform</p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Transform Your Property Management Experience
          </h2>
          <p className="text-xl text-blue-100 leading-relaxed max-w-md">
            Join thousands of successful property managers who've streamlined
            their operations and maximized their returns with Propertify.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 group">
              <div
                className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="mt-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
                <div className="text-right">
                  <div className="text-green-300 text-xs font-medium">
                    {stat.trend}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Testimonial Carousel */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <div className="flex items-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <CheckCircle
                key={i}
                className="h-4 w-4 text-yellow-400 fill-current"
              />
            ))}
            <span className="text-sm text-blue-100 ml-2">
              Trusted by thousands
            </span>
          </div>
          <p className="text-blue-50 italic leading-relaxed">
            "{testimonials[0]}"
          </p>
          <div className="text-xs text-blue-200 mt-3">
            - Sarah Chen, Portfolio Manager at Urban Properties
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;