import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function P404() {
  return (
    <div className="row mt-2">
      <div className="colgrid col">
        <div className="card-group modern row row-cols-1 row-cols-md-1">
          <div className="col mb-4">
            <div className="card h-100">
              <div className="card-body-wrap h-100 no-image">
                <div className="card-header">404 page</div>
                <div className="card-body">
                  <h4 className="card-title">404 Error</h4>
                  <h5 className="card-subtitle mb-2 text-muted">
                    This page does not exist in the app
                  </h5>
                  <div className="card-text">
                    <p>We can't see to find the page you are looking for</p>
                  </div>
                </div>
                <div className="card-footer card-footer-horizontal">
                  <Link to="/" title="Home">
                    <FontAwesomeIcon icon={faChevronRight} /> Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
