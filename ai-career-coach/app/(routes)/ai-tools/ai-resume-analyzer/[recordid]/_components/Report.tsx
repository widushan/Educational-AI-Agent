import ResumeUploadDialog from '@/app/(routes)/dashboard/_components/ResumeUploadDialog';
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkle } from 'lucide-react'
import React, { useState } from 'react'

function Report({aiReport}:any) {

    const [openResumeUpload, setOpenResumeUpload] = useState(false);

    const getStatusColor = (per: number) => {
        if (per < 60) return 'red';
        if (per >= 60 && per <= 80) return 'yellow';
        return 'green';
    };
    const getBorderColor = (per: number) => {
        const color = getStatusColor(per);
        return `border-${color}-500`;
    };
      
      const getTextColor = (per: number) => {
        const color = getStatusColor(per);
        return `text-${color}-500`;
    };

    const overallScore = aiReport?.overall_score ?? 0;
    const contactScore = aiReport?.section_scores?.contact_info?.score ?? 0;
    const experienceScore = aiReport?.section_scores?.experience?.score ?? 0;
    const educationScore = aiReport?.section_scores?.education?.score ?? 0;
    const skillsScore = aiReport?.section_scores?.skills?.score ?? 0;

  return (

    <div className='p-5'>
        <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800 gradient-component-text">AI Analysis Results</h2>
        <Button type='button' onClick={()=>setOpenResumeUpload(true)}>
            Re-analyze <Sparkle />
        </Button>
        </div>
        

        <div className="bg-gradient-to-r from-[#BE575F] via-[#A338E3] to-[#AC76D6] rounded-lg shadow-md p-6 mb-5 border border-blue-200 transform hover:scale-[1.01] transition-transform duration-300 ease-in-out">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <i className="fas fa-star text-yellow-500 mr-2"></i> Overall Score
        </h3>
        <div className="flex items-center justify-between mb-4">
            <span className="text-6xl font-extrabold text-white">{aiReport?.overall_score}<span className="text-2xl">/100</span></span>
            <div className="flex items-center">
            <i className={`fas fa-arrow-up text-lg mr-2 ${getTextColor(overallScore)}`}></i>
            <span className={`text-lg font-bold ${getTextColor(overallScore)}`}>{aiReport?.overall_feedback}</span>
            </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-white h-2.5 rounded-full" style={{ width: `${overallScore}%` }}></div>
        </div>
        <p className="text-gray-200 text-sm">{aiReport?.summary_comment}</p>
        </div>
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className={`bg-white rounded-lg shadow-md p-5 border relative overflow-hidden group ${getBorderColor(contactScore)}`}>
            <h4 className="text-lg font-semibold text-gray-700 mb-3"><i className="fas fa-user text-gray-500 mr-2"></i> Contact Info</h4>
            <span className={`text-4xl font-bold ${getTextColor(contactScore)}`}>{aiReport?.section_scores?.contact_info?.score}%</span>
            <p className="text-sm text-gray-600 mt-2">{aiReport?.section_scores?.contact_info?.comment}</p>
            <div className="absolute inset-x-0 bottom-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className={`bg-white rounded-lg shadow-md p-5 border relative overflow-hidden group ${getBorderColor(experienceScore)}`}>
            <h4 className="text-lg font-semibold text-gray-700 mb-3"><i className="fas fa-briefcase text-gray-500 mr-2"></i> Experience</h4>
            <span className={`text-4xl font-bold ${getTextColor(experienceScore)}`}>{aiReport?.section_scores?.experience?.score}%</span>
            <p className="text-sm text-gray-600 mt-2">{aiReport?.section_scores?.experience?.comment}</p>
            <div className="absolute inset-x-0 bottom-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className={`bg-white rounded-lg shadow-md p-5 border relative overflow-hidden group ${getBorderColor(educationScore)}`}>
            <h4 className="text-lg font-semibold text-gray-700 mb-3"><i className="fas fa-graduation-cap text-gray-500 mr-2"></i> Education</h4>
            <span className={`text-4xl font-bold ${getTextColor(educationScore)}`}>{aiReport?.section_scores?.education?.score}%</span>
            <p className="text-sm text-gray-600 mt-2">{aiReport?.section_scores?.education?.comment}</p>
            <div className="absolute inset-x-0 bottom-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className={`bg-white rounded-lg shadow-md p-5 border relative overflow-hidden group ${getBorderColor(skillsScore)}`}>
            <h4 className="text-lg font-semibold text-gray-700 mb-3"><i className="fas fa-lightbulb text-gray-500 mr-2"></i> Skills</h4>
            <span className={`text-4xl font-bold ${getTextColor(skillsScore)}`}>{aiReport?.section_scores?.skills?.score}%</span>
            <p className="text-sm text-gray-600 mt-2">{aiReport?.section_scores?.skills?.comment}</p>
            <div className="absolute inset-x-0 bottom-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        </div>
        

        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
            <i className="fas fa-lightbulb text-orange-400 mr-2"></i> Tips for Improvement
        </h3>
        <ol className="list-none space-y-4">
            <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3"><i className="fas fa-check"></i></span>
            <div>
                <p className="font-semibold text-gray-600">{aiReport?.tips_for_improvement[0]}</p>
                <p className="text-gray-600 text-sm">{aiReport?.tips_for_improvement[0]}</p>
            </div>
            </li>
            <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3"><i className="fas fa-check"></i></span>
            <div>
                <p className="font-semibold text-gray-600">{aiReport?.tips_for_improvement[1]}</p>
                <p className="text-gray-600 text-sm">{aiReport?.tips_for_improvement[1]}</p>
            </div>
            </li>
            <li className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3"><i className="fas fa-check"></i></span>
            <div>
                <p className="font-semibold text-gray-600">{aiReport?.tips_for_improvement[2]}</p>
                <p className="text-gray-600 text-sm">{aiReport?.tips_for_improvement[2]}</p>
            </div>
            </li>
        </ol>
        </div>
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-5 border border-green-200">
            <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center">
            <i className="fas fa-hand-thumbs-up text-green-500 mr-2"></i> What's Good
            </h3>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
            <li>{aiReport?.whats_good[0]}</li>
            <li>{aiReport?.whats_good[1]}</li>
            <li>{aiReport?.whats_good[2]}</li>
            </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-5 border border-red-200">
            <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center">
            <i className="fas fa-hand-thumbs-down text-red-500 mr-2"></i> Needs Improvement
            </h3>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">
            <li>{aiReport?.needs_improvement[0]}</li>
            <li>{aiReport?.needs_improvement[1]}</li>
            <li>{aiReport?.needs_improvement[2]}</li>
            </ul>
        </div>
        </div>
        

        <div className="bg-blue-600 text-white rounded-lg shadow-md p-6 mb-6 text-center gradient-button-bg">
        <h3 className="text-2xl font-bold mb-3">Ready to refine your resume? 🚀</h3>
        <p className="text-base mb-4">Make your application stand out with our premium insights and features.</p>
        <Button type="button" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
            Upgrade to Premium <ArrowRight />
        </Button>
        </div>

        <ResumeUploadDialog openResumeUpload={openResumeUpload} setOpenResumeUpload={()=>setOpenResumeUpload(false)} />

    </div>


  )

}

export default Report