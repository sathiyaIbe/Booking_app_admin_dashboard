import React, { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'primereact/chart';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom'
import Header from '../../core/header/header';
import { BsCurrencyDollar } from 'react-icons/bs'
import { MdOutlineFlight } from 'react-icons/md'
import { CiUser } from 'react-icons/ci'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { Card } from 'primereact/card';
import 'primeicons/primeicons.css';
import Context from '../../services/Context/Context';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { CChart } from '@coreui/react-chartjs'
import { Chrono } from 'react-chrono'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CountUserApi } from '../../services/UserService/UserService';
import { ChartDataApi } from '../../services/UserService/UserService';
import { TotalAdminData } from '../../services/UserService/UserService';
import { GetUserDetailsApi } from '../../services/UserService/UserService';
const AdminDashboard = () => {
    const [userCount, setUserCount] = useState('')
    const [totalRevenue, setTotalRevene] = useState('')
    const [totalBooking, setTotalBooking] = useState('')
    const [totalUser, setTotalUser] = useState('')
    const [size, setSize] = useState([0, 0]);
    const [adminChartData, setAdminChartData] = useState([])
    const [userTableDetails, setUserTableDetails] = useState([])
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    useEffect(() => {
        CountUserApi().then(res => {
            setUserCount(res.data.count)
        })
        GetUserDetailsApi().then(res => {
            setUserTableDetails(res.data)
        })
        ChartDataApi().then(res => {
            setAdminChartData(res.data)
        })
        TotalAdminData().then(res => {
            setTotalBooking(res.data.TotalBooking[0].TotalBooking)
            setTotalRevene(res.data.Totalrevenue[0].Totalrevenue)
            setTotalUser(res.data.TotalUser[0].TotalUser)
        })
    }, [userCount])
    const tableUserData = userTableDetails.slice(-5)
    function bookingNewData() {
        return adminChartData.map((each) => {
            return each.booking
        })
    }
    function userNewData() {
        const datas = adminChartData.map(each => {
            return each.user
        })
        return datas
    }
    function activeNewData() {
        const datas = adminChartData.map(each => {
            return each.userActive
        })
        return datas
    }
    function inActiveNewData() {
        const datas = adminChartData.map(each => {
            return each.userInActive
        })
        return datas
    }
    const userDataCount = userNewData()
    const bookingDataCount = bookingNewData()
    const activeDataCount = activeNewData()
    const inActiveDataCount = inActiveNewData()
    
    const navigate = useNavigate()

    const chronoData = [
        {
            title: "25 May 2020",
            contentText:
                "Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.",
            contentDetailedText: `On 10 May 1940, Hitler began his long-awaited offensive in the west by invading neutral Holland and Belgium and attacking northern France. Holland capitulated after only five days of fighting, and the Belgians surrendered on 28 May. With the success of the German ‘Blitzkrieg’, the British Expeditionary Force and French troops were in danger of being cut off and destroyed.`
        },
        {
            title: "25 July 2021",
            contentTitle: "The Battle of Britain",
            contentText: `RAF Spitfire pilots scramble for their planes`,
            contentDetailedText: `After France’s surrender in June 1940, Churchill told the British people, “Hitler knows that he will have to break us in this island or lose the war”. To mount a successful invasion, the Germans had to gain air superiority. The first phase of the battle began on 10 July with Luftwaffe attacks on shipping in the Channel.
        The following month, RAF Fighter Command airfields and aircraft factories came under attack. Under the dynamic direction of Lord Beaverbrook, production of Spitfire and Hurricane fighters increased, and despite its losses in pilots and planes, the RAF was never as seriously weakened as the Germans supposed.`
        },
        {
            title: "01 June 2022",
            contentTitle: "Operation Barbarossa",
            contentText: `A column of Red Army prisoners taken during the first days of the German invasion`,
            contentDetailedText: `Since the 1920s, Hitler had seen Russia, with its immense natural resources, as the principal target for conquest and expansion. It would provide, he believed, the necessary ‘Lebensraum’, or living space, for the German people. And by conquering Russia, Hitler would also destroy the “Jewish pestilential creed of Bolshevism”. His non-aggression pact with Stalin in August 1939 he regarded as a mere temporary expedient.
        Barely a month after the fall of France, and while the Battle of Britain was being fought, Hitler started planning for the Blitzkrieg campaign against Russia, which began on 22 June 1941. Despite repeated warnings, Stalin was taken by surprise, and for the first few months the Germans achieved spectacular victories, capturing huge swathes of land and hundreds of thousands of prisoners. But they failed to take Moscow or Leningrad before winter set in.
        On 5/6 December, the Red Army launched a counter-offensive which removed the immediate threat to the Soviet capital. It also brought the German high command to the brink of a catastrophic military crisis. Hitler stepped in and took personal command. His intervention was decisive and he later boasted, “That we overcame this winter and are today in a position again to proceed victoriously… is solely attributable to the bravery of the soldiers at the front and my firm will to hold out…”`
        },
        {
            title: "7 December 2022",
            contentTitle: "Pearl Harbor",
            contentText: `The destroyer USS Shaw explodes in dry dock after being hit by Japanese aircraft`,
            contentDetailedText: `After Japan’s occupation of French Indo-China in July 1941, US President Franklin D Roosevelt, followed by Britain and the Netherlands, ordered the freezing of Japanese assets.
        Many Japanese now believed that there was no alternative between economic ruin and going to war with the United States and the European colonial powers. In October 1941, a hardline government under General Hideki Tojo came to power, and preparations were made to deliver a devastating blow against the Americans.`
        },
    ]
    const dataaaa = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June',],
        datasets: [
            {
                label: 'Active',
                backgroundColor: "#74b87e",
                borderColor: "green",
                data: activeDataCount
            },
            {
                label: 'In Active',
                backgroundColor: '#db8074',
                borderColor: "red",
                data: inActiveDataCount
            }
        ]
    };
    const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    fontColor: "gray"
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: "gray",
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: "gray"
                },
                grid: {
                    color: "gray",
                    drawBorder: false
                }
            }
        }
    };
    const polarData = {
        labels: ['New User', 'Bookings', 'Revenue'],
        datasets: [
            {
                data: [totalUser, totalBooking, totalRevenue / 10],
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726"
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                    "#FFB74D"
                ]
            }
        ]
    }


    let newStylesData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June',],
        datasets: [
            {
                label: 'Booking Data',
                data: bookingNewData(),
                fill: false,
                tension: .4,
                borderColor: '#42A5F5'
            },
            {
                label: 'User Data',
                data: userNewData(),
                fill: true,
                tension: .4,
                borderColor: '#66BB6A'
            },
        ]
    }
    let basicOptions = {
        maintainAspectRatio: false,
        aspectRatio: .6,
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
    const radarData = {
        labels: ['Active', 'InActive', 'Booking', 'User',],
        datasets: [
            {
                label: 'First month dataset',
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [activeDataCount[activeDataCount.length - 1], inActiveDataCount[inActiveDataCount.length - 1], bookingDataCount[bookingDataCount.length - 1], userDataCount[bookingDataCount.length - 1]]
            },
            {
                label: 'Second month dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                pointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255,99,132,1)',
                data: [activeDataCount[activeDataCount.length - 2], inActiveDataCount[inActiveDataCount.length - 2], bookingDataCount[bookingDataCount.length - 2], userDataCount[bookingDataCount.length - 2]]
            }
        ]
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`product-badge status-${rowData.status}`}>{rowData.status}</span>;
    }
    return (
        <Context.Consumer>
            {value => {
                const { sidebar } = value
                return (
                    <div className="AdminDashboard" data-testid="AdminDashboard">
                        <div className='card-container'>
                            <Header />
                            <div className={`admin-dashboard-body-container  ${sidebar ? 'sidebar-admin' : ''}`} >
                                <h1 className='admin-dashboard-heading'>Admin Dashboard</h1>
                                <div className={`card-main-container   ${sidebar ? 'sidebar-card-main-container ' : ''}`} >
                                    <div className='card-body-container'>
                                        <div className='dashboard-card-container'>
                                            <Card className='card' title='Users'>
                                                <div className='card-description-container'>
                                                    <CiUser className='icon-card user' />
                                                    <div>
                                                        <h5 className=" card-title" > {totalUser}</h5>
                                                        <p className='card-subtitle'><span className='subtitle'>12%</span> increase</p>
                                                    </div>
                                                </div>
                                            </Card>
                                            <Card className='card' title="Total Booking" >
                                                <div className='card-description-container'>
                                                    <MdOutlineFlight className='icon-card booking' />
                                                    <div>
                                                        <h3 className=" card-title" > {totalBooking}</h3>
                                                        <p className='card-subtitle'><span className='subtitle'>5%</span> increase</p>
                                                    </div>
                                                </div>
                                            </Card>
                                            <Card className='card revenue-card' title="Revenue" >
                                                <div className='card-description-container'>
                                                    <BsCurrencyDollar className='icon-card revenue' />
                                                    <div>
                                                        <h3 className=" card-title" >${totalRevenue}</h3>
                                                        <p className='card-subtitle'><span className='subtitle'>27%</span> increase</p>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                        <div className="card-charts-dashboard">
                                            <h3 className='card-main-heading'>Month Wise Data</h3>
                                            <Chart className='charts' type="line" data={newStylesData} options={basicOptions} />
                                        </div>
                                        <div className='static-table-cotainer'>
                                            <h3 className='card-main-heading'>User Details</h3>
                                            <div className="cardss">
                                                <DataTable className="table" value={tableUserData} responsiveLayout="scroll">
                                                    <Column field="userId" header="user-id"></Column>
                                                    <Column field="username" header="Name"></Column>
                                                    <Column field="email" header="Email"></Column>
                                                    <Column field="status" header="Status" body={statusBodyTemplate}></Column>
                                                </DataTable>
                                            </div>

                                        </div>
                                        <div className="static-table-cotainer">
                                            <h3 className='card-main-heading'>User Status</h3>
                                            <Chart className='charts' type="bar" data={dataaaa} options={options} />
                                        </div>
                                    </div>
                                    <div className='pie-radar-container'>
                                        <div className="card-pie-dashboard">
                                            <h3 className='card-main-heading'>Overall Performance</h3>
                                            <div className='position-container'>
                                                <CChart className='pie-dashboard' type="polarArea" data={polarData} />
                                            </div>
                                        </div>
                                        <div className="card-radar-dashboard">
                                            <h3 className='card-main-heading'>Last Two Month</h3>
                                            <div className='position-container'>
                                                <CChart className='radar-dashboard' type="radar" data={radarData} />
                                            </div>
                                        </div>
                                        <div className='card-chrono-dashboard'>
                                            <div style={{ width: "90%", height: "745px" }}>
                                                <h3 className='card-main-heading side'>Recent Activity</h3>
                                                <Chrono classNames='chrono' items={chronoData} mode="VERTICAL_ALTERNATING" >
                                                    {chronoData.map((each,index) => (
                                                        <p key={index}>{each.contentText}</p>
                                                    ))}
                                                </Chrono>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }}
        </Context.Consumer>
    )
};
AdminDashboard.propTypes = {};
AdminDashboard.defaultProps = {};
export default AdminDashboard;
