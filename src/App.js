import React, { useEffect } from 'react';
import { useRoutes } from 'hookrouter';

// pages
import HomePage from './pages/Home V2';
import TeamPage from './pages/Team';
import BlogPage from './pages/Blog V2';
import AboutPage from './pages/About';
import BlogpostPage from './pages/Blogpost V2';
import SponsorsPage from './pages/Sponsors V2';
import HistoryPage from './pages/History';
import JoinPage from './pages/Join';
import AdminPage from './pages/Admin';
import ThesisPage from './pages/Thesis';
import ThesisDetailsPage from './pages/ThesisDetails';
import PageNotFound from './pages/PageNotFound';


export default function App() {
  
  const routes = {
    '/' : () => <HomePage />,
    '/blog' : () => <BlogPage />,
    '/blog/:id' : (props) => <BlogpostPage id={props.id} />,
    '/sponsors' : () => <SponsorsPage />,
    '/about' : () => <AboutPage />,
    '/team' : () => <TeamPage />,
    '/team/:year' : (props) => <TeamPage year={props.year} />,
    '/history' : () => <HistoryPage />,
    '/thesis/:id' : (props) => <ThesisDetailsPage id={props.id} />,
    '/join' : () => <JoinPage />,
    '/admin' : () => <AdminPage />,
  }
  
  const routeResult = useRoutes(routes);

  useEffect(() => window.scrollTo(0, 0));

  return routeResult || <PageNotFound />
}