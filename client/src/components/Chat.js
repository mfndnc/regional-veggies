import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Collapse, Button } from 'react-bootstrap';
import api from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function Chat(props) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    console.log('handleSubmit', message);
    e.preventDefault();
    if (message) {
      props.childtoParent(message);
      setMessage('');
    }
  };

  const messageList =
    props &&
    props.messages &&
    props.messages.map((mess, idx) => {
      return mess.origin === props.writer ? (
        <div className="outgoing_msg" key={`out${idx}`}>
          <div className="sent_msg">
            <p>{mess.message}</p>
            <span className="time_date"> 11:01 AM | Today</span>
          </div>
        </div>
      ) : (
        <div className="incoming_msg" key={`in${idx}`}>
          <div className="received_msg">
            <div className="received_withd_msg">
              <p>{mess.message}</p>
              <span className="time_date"> 11:01 AM | Today</span>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="container">
      <div className="row">
        <div className="colgrid col">
          <div className="card-group modern row row-cols-1 row-cols-md-1">
            <div className="col mb-4">
              <div className="card classic h-100 text-left">
                <div className="card-body">
                  <h5 className="card-subtitle mb-2 text-muted">
                    Lorem ipsum dolor sit amet consectetur
                  </h5>
                  <div className="card-text">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
      <div className="row">
        <div className="colgrid col">
          <div className="card-group modern row row-cols-1 row-cols-md-1">
            <div className="col mb-4">
              <div className="card h-100">
                <div className="card-body-wrap h-100 no-image">
                  <div className="card-body">
                    <div className="messaging">
                      <div className="inbox_msg">
                        <div className="mesgs">
                          <div className="msg_history">{messageList}</div>{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="type_msg">
                      <div className="input_msg_write">
                        <form className="m-1" onSubmit={handleSubmit}>
                          <input
                            className="form-control"
                            type="text"
                            name="chat"
                            id="chat"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                          <button className="msg_send_btn" type="submit">
                            <FontAwesomeIcon icon={faPaperPlane} />
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
