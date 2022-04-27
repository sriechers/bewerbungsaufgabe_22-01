import WeatherWidget from "../components/WeatherWidget";
import NewsFeed from "../components/NewsFeed";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";

function Dashboard() {
  return (
    <>
      <Helmet>
        <title>heise Dashboard</title>
        <meta
          name="description"
          content="Ein Dashboard, welches das Wetter und aktuelle News anzeigt."
        />
      </Helmet>
      <Layout>
        <WeatherWidget />
        <NewsFeed />
      </Layout>
    </>
  );
}

export default Dashboard;
