import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import '../../CssFiles/SinglePage.css';
import Comment from './Comment';
import CommentContext from '../../Contexts/CommentsContext';
import SingleTicketContext from '../../Contexts/SingleTicketContext';

const SinglePage = () => {
    const { ticket_id } = useParams();

    const { comments, setComments } = useContext(CommentContext);
    const { ticket, setTicket } = useContext(SingleTicketContext);
    const [techComment, setTechComment] = useState('');

    function handleChange(e) {
        setTechComment(e.target.value)
    };

    const postComment = async () => {
        const response = await axios.post("https://taskappapi.onrender.com/tech/ticket/comment", {
            user_id: 11,
            ticket_id: ticket_id,
            comment: techComment
        })
        console.log(response)
    };

    function handleSubmit(e) {
        e.preventDefault()
        postComment()
        setTechComment('')
    };

    useEffect(() => {
        const getComments = async () => {
            const { data } = await axios.get(`https://taskappapi.onrender.com/tech/ticket/${ticket_id}/comment`)
            setComments(data)
        }
        getComments()
    }, [techComment]);

    useEffect(() => {
        const getSingleTicket = async () => {
            // const { data } = await axios.get(`https://taskappapi.onrender.com/tech/ticket/${ticket_id}`)
            const { data } = await axios.get(`http://localhost:6001/tech/ticket/${ticket_id}`)
            // returns array with 2 objects 1=ticket info | 2= account info 
            console.log(data)
            setTicket(data)

        }
        getSingleTicket()
    }, []);



    return (
        <div className='singlePageContainer'>

            <div className='SingleTicket'>
                <h4>UserName Pic??</h4>
                <img alt='' className="test-img" src={ticket[1].profilepic} />
                <h3 className='TicketTitle'>Ticket Category: {ticket[0].category}</h3>
                <p className='ticketDescrip'>Ticket Description: {ticket[0].descrip}</p>
            </div>
            <div className='Line'></div>

            <div className='SingleTicket2'>
                <h2>Ticket #{ticket.ticket_id}</h2>
                <h3 id='camp'>Campus: <span id='highlight'>{ticket[0].name}</span></h3>
                <h3 id='camp'>Priority: <span id='highlight'>{ticket[0].priority}</span></h3>
                <h3 id='camp'>Date: <span id='highlight'>{ticket[0].to_char}</span></h3>
                <div>
                    <div className='Comment'>{comments.map((data) => (
                        <Comment key={data.ticket_id} data={data} />
                    ))}

                        <Link to="/tech">
                            <button className="back-to-tickets">Tickets</button>
                        </Link>

                    </div>

                    <form onSubmit={handleSubmit}>
                        <input type='text' value={techComment} onChange={handleChange} />
                        <input type='submit' value='Submit Comment' />
                    </form>

                </div>
            </div>
        </div>
    )
}

export default SinglePage;