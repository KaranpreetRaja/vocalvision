import Navbar from '../components/navbar';
import Card from '../components/card';
import Sidebar from '../components/sidebar';
import Wizard from '../components/wizard';
import { useParams } from 'react-router-dom';

export default function Dashboard(){
    const { uid } = useParams();

    return(
        <div>
            <Navbar logged={true} userId={uid} />
            <div className='bg-gray-50 w-screen h-screen flex flex-row'>
                <Sidebar/>

                <div className="flex flex-col w-full p-16 ">
                    <h2 className="text-2xl font-semibold">Recent Visions</h2>
                    <div className="flex w-full px-2 py-11 space-x-9">
                        <Wizard userid={uid}/>
                        <Card name="EECS 3311"/>
                        <Card name="Dinosaurs"/>
                        <Card name="How to be big"/>
                        <Card name="RIZZ 101"/>
                    </div>
                </div>              
            </div>
        </div>
    )
}