import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import SignUpPage from "./SignUpPage";
import Layout from "./Layout";
import LoginPage from "./LoginPage";
import UpdateSkill from "./components/Skill/UpdateSkill";
import CreateLifestyle from "./components/Lifestyle/CreateLifestyle";
import Lifestyle from "./components/Lifestyle/Lifestyle";
import UpdateLifestyle from "./components/Lifestyle/UpdateLifestyle";
import DeleteLifestyle from "./components/Lifestyle/DeleteLifestyle";
import CreateFitnessEntry from "./components/Fitness/CreateFitnessEntry";
import GetUserFitnessEntries from "./components/Fitness/GetUserFitnessEntries";
import UpdateFitnessEntry from "./components/Fitness/UpdateFitnessEntry";
import DeleteFitnessEntry from "./components/Fitness/DeleteFitnessEntry";
import CreateEmotionalWellnessEntry from "./components/CreateEmotionalWellnessEntry";
import EmotionalWellnessEntries from "./components/EmotionalWellnessEntries";
import UpdateEmotionalWellnessEntry from "./components/UpdateEmotionalWellnessEntry";
import CreateProfile from "./components/CreateProfile";
import UserProfile from "./components/UserProfile";
import SkillsDashboardPage from "./pages/Skill/SkillsDashboardPage";
import LifestyleDashboard from "./pages/Skill/LifestyleDashboard";
import FitnessDashboardPage from "./pages/Skill/FitnessDashboard";
import EmotionalWellnessDashboardPage from "./pages/Skill/EmotionalWellnessDashboard";
import Dashboard from "./components/Dashboard/Dashboard";
const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inscription" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/update-skill/:skillId" element={<UpdateSkill />} />
        <Route path="/lifestyle" element={<Lifestyle />} />
        <Route path="/create-lifestyle" element={<CreateLifestyle />} />
        <Route path="/update-lifestyle" element={<UpdateLifestyle />} />
        <Route path="/delete-lifestyle" element={<DeleteLifestyle />} />
        {/* <Route path="/fitness" element={<Fitness />} /> */}
        <Route path="/create-fitness-entry" element={<CreateFitnessEntry />} />
        <Route path="/user-fitness-entries" element={<GetUserFitnessEntries />} />
        <Route path="/update-fitness-entry/:entryId" element={<UpdateFitnessEntry />} />
        <Route path="/delete-fitness-entry/:entryId" element={<DeleteFitnessEntry />} />
        <Route path="/create-emotional-wellness-entry" element={<CreateEmotionalWellnessEntry />} />
        <Route path="/emotional-wellness-entries" element={<EmotionalWellnessEntries />} />
        <Route path="/update-emotional-wellness-entry/:entryId" element={<UpdateEmotionalWellnessEntry/>} />
        <Route path="/create-profile" element={<CreateProfile/>}/>
        <Route path="/user-profile" element={<UserProfile/>}/>
        <Route path="/skills/dashboard" element={<SkillsDashboardPage/>} />
        <Route path="/lifestyle/dashboard" element={<LifestyleDashboard />} />
        <Route path="/fitness/dashboard" element={<FitnessDashboardPage />} />
        <Route path="/emotional-wellness/dashboard" element={<EmotionalWellnessDashboardPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
