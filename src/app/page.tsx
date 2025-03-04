"use client";
import { useState, useEffect } from "react";
import { create } from "zustand";

// Define TypeScript types
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  requiredSkills: string[];
  matchScore?: number;
}

// Mock Job Data
const jobData: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Remote",
    salary: "$70,000 - $90,000",
    requiredSkills: ["React", "Next.js", "JavaScript", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "UI Engineer",
    company: "DesignPro",
    location: "New York, USA",
    salary: "$80,000 - $100,000",
    requiredSkills: ["Figma", "React", "CSS"],
  },
  // {
  //   id: 3,
  //   title: "Backend Engineer",
  //   company: "DesignPro",
  //   location: "New York, USA",
  //   salary: "$80,000 - $100,000",
  //   requiredSkills: ["Node.js", "Express", "MongoDB"],
  // },
  // {
  //   id: 4,
  //   title: "Cloud Engineer",
  //   company: "DesignPro",
  //   location: "New York, USA",
  //   salary: "$80,000 - $100,000",
  //   requiredSkills: ["AWS", "Docker", "Kubernetes"],
  // },
];

// Mock User Data
const userSkills: string[] = ["React", "JavaScript", "CSS", "Tailwind CSS"];

// Function to Calculate Match Score
const calculateMatchScore = (
  jobSkills: string[],
  userSkills: string[]
): number => {
  const matchedSkills = jobSkills.filter((skill) => userSkills.includes(skill));
  return Math.round((matchedSkills.length / jobSkills.length) * 100);
};

// Zustand Store for State Management
interface JobStore {
  jobs: Job[];
  fetchJobs: () => void;
}

const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  fetchJobs: () =>
    set({
      jobs: jobData.map((job) => ({
        ...job,
        matchScore: calculateMatchScore(job.requiredSkills, userSkills),
      })),
    }),
}));

export default function Home() {
  const { jobs, fetchJobs } = useJobStore();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="min-h-screen bg-white/90 p-6">
      <h1 className="md:text-2xl text-lg font-bold mb-4 text-black">
        AI-Powered Job Match Dashboard
      </h1>
      <div className="grid gap-4 md:grid-cols-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-4 bg-white rounded-2xl shadow-md cursor-pointer hover:scale-105 transition scroll-smooth"
            onClick={() => setSelectedJob(job)}
          >
            <h2 className="text-lg font-semibold text-black">{job.title}</h2>
            <p className="text-gray-600">
              {job.company} - {job.location}
            </p>
            <p className="text-gray-700 font-bold">{job.salary}</p>
            <div
              className={`mt-2 text-white px-2 text-center py-1 rounded-full ${
                job.matchScore && job.matchScore >= 80
                  ? "bg-green-500"
                  : job.matchScore && job.matchScore >= 50
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              Match Score: {job.matchScore}%
            </div>
          </div>
        ))}
      </div>

      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-2 md:px-0">
          <div className="bg-white md:p-6 p-4 space-y-4 rounded-lg shadow-lg md:w-2/6">
            <h2 className="text-xl text-black font-bold">
              {selectedJob.title}
            </h2>
            <p className="text-gray-600">
              {selectedJob.company} - {selectedJob.location}
            </p>
            <p className="text-gray-700 font-bold">{selectedJob.salary}</p>
            <div className="text-black/80 ">
              {" "}
              <p className="mt-2 font-medium">
                <b> Required Skills:</b> {selectedJob.requiredSkills.join(", ")}
              </p>
              <p className="mt-2">
                <b>Your Skills:</b> {userSkills.join(", ")}
              </p>
              {selectedJob.matchScore && selectedJob.matchScore < 50 && (
                <p className="mt-2 text-red-500">
                  Upskill Suggestion: Learn{" "}
                  {selectedJob.requiredSkills
                    .filter((skill) => !userSkills.includes(skill))
                    .join(", ")}
                </p>
              )}
            </div>
            <div className="flex md:flex-row flex-col gap-4 w-full items-center mt-4">
              <button
                className=" bg-blue-500 text-white py-2 rounded-full  w-full  cursor-pointer"
                onClick={() => alert("Apply action (mock)")}
              >
                Apply Now
              </button>
              <button
                className=" text-red-500 block border py-2 rounded-full  w-full cursor-pointer"
                onClick={() => setSelectedJob(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
