import { useQuery } from '@apollo/client';
import { QUERY_DREAMS } from '../utils/queries';
import DreamList from '../components/DreamList';

const Home = () => {
    const { loading, data } = useQuery(QUERY_DREAMS);
    const dreams = data?.dreams || [];
    console.log(dreams);
    return (
        <main>
            <div className="">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <DreamList dreams={dreams} title="Dreams Feed" />
                )}
                <div className="">{/*dreamlist*/}</div>
            </div>
        </main>
    );
};

export default Home;
    

