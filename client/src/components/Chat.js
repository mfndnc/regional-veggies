import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../services/functions';

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
      const dateshow = mess.time > 0 ? formatDate(mess.time) : '';
      return mess.origin === props.writer ? (
        <div className="outgoing_msg outer_msg" key={`out${idx}`}>
          <div className="sent_msg">
            <p>{mess.message}</p>
            <span className="time_date">{dateshow}</span>
          </div>
        </div>
      ) : (
        <div className="incoming_msg outer_msg" key={`in${idx}`}>
          <div className="received_msg">
            <div className="received_withd_msg">
              <p>{mess.message}</p>
              <span className="time_date">{dateshow}</span>
            </div>
          </div>
        </div>
      );
    });

  return (
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
  );
}
