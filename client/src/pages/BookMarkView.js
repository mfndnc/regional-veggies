import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import api from '../api';

export default function BookMarkView() {
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [commentObj, setCommentObj] = useState({});
  const [messErrTarget, setMessErrTarget] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([api.getAlls('bookmark/user')])
      .then(([bookm]) => {
        if (bookm.data.length) {
          const sortedBookmarked = bookm.data.sort((a, b) =>
            a.address.name.localeCompare(b.address.name)
          );
          //console.log(sortedBookmarked);
          const tmpdt = {};
          sortedBookmarked.forEach((book) => {
            tmpdt[`book${book._id}`] = book.comment;
          });

          setCommentObj(tmpdt);
          setBookmarks(sortedBookmarked);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentObj((prevSt) => ({
      ...prevSt,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(false);
    setError(false);
    const formid = e.target.id;
    const tmp = formid.substr(5);
    const comment = commentObj[tmp];
    const bookmarkid = tmp.substr(4);
    const payload = { what: 'comment', newvalue: comment };
    //console.log(formid, tmp, bookmarkid, comment);
    //console.log(e);
    setMessErrTarget(tmp);
    api
      .updateById('bookmark', bookmarkid, payload)
      .then((_) => setSaved(true))
      .catch((_) => setError(true))
      .finally(() => {
        setTimeout(() => {
          setSaved(false);
          setError(false);
          setMessErrTarget('');
        }, 2000);
      });
  };
  if (loading) return <div>Loading ...</div>;

  const bookmarkList =
    bookmarks &&
    bookmarks.map((book, idx) => {
      const ddd = `book${book._id}`;
      const comment = commentObj[ddd];
      const showMessage = saved && messErrTarget === ddd && (
        <div className="alert alert-success" role="alert">
          Saved!
        </div>
      );
      const notsaved = error && messErrTarget === ddd && (
        <div className="alert alert-danger" role="alert">
          An error occured!!!
        </div>
      );
      return (
        <div className="col mb-4" key={ddd}>
          <div className="card h-100">
            <div className="card-body-wrap h-100 no-image">
              <div className="card-header">Bookmark</div>
              <div className="card-body">
                <h5 className="card-title">{book.address.name}</h5>
                <div className="card-text">
                  <p>
                    {book.address.street} {book.address.suite},{' '}
                    {book.address.zipcode} {book.address.city}
                  </p>
                </div>
                <p className="card-text">{book.event.note}</p>
                <p className="card-text">{book.event.promo}</p>

                <div className="card-text">
                  <form
                    className="m-1"
                    id={`form-${ddd}`}
                    onSubmit={handleSubmit}
                  >
                    <label>Personal Comment</label>
                    <textarea
                      name={ddd}
                      type="text"
                      className="form-control"
                      rows="3"
                      value={comment}
                      onChange={handleChange}
                    ></textarea>
                    {showMessage} {notsaved}
                    <Button
                      variant="secondary"
                      size="sm"
                      type="submit"
                      className="mb-2 mt-2"
                    >
                      Submit
                    </Button>
                  </form>
                </div>
              </div>
              <div className="card-footer">
                <Link
                  className="btn btn-secondary text-white"
                  to={`/bookmarkview/${book._id}`}
                >
                  Communicate
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div>
      <div className="row">
        <div className="colgrid col">
          <div className="card-group modern row row-cols-1 row-cols-md-1">
            <div className="col mb-4">
              <div className="card classic h-100 text-left">
                <div className="card-body">
                  <h5 className="card-subtitle mb-2 text-muted">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quas, perspiciatis.
                  </h5>
                  <div className="card-text">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Error, repellat id at natus dolorum aliquam quae vitae.
                      Quam, nihil labore nemo, ex ipsum delectus a illo,
                      doloribus eaque repellat nobis!
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
          <div className="card-group modern row row-cols-1 row-cols-md-2">
            {bookmarkList}
          </div>
        </div>
      </div>
    </div>
  );
}
