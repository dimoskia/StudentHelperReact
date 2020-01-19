import React from "react";
import ReactPaginate from 'react-paginate';

const pagination = props => {

    const handlePageClick = e => {
        props.onPageChange(e.selected);
    };

    const paginate = () => {
        if(props.totalPages !== 0) {
            return (
                <ReactPaginate previousLabel={<span className="fa fa-angle-double-left"/>}
                               nextLabel={<span className="fa fa-angle-double-right"/>}
                               breakLabel={<span className="gap">...</span>}
                               breakClassName={"break-me"}
                               pageCount={props.totalPages} //broj na stranici
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               pageClassName={"page-item"}
                               pageLinkClassName={"page-link"}
                               previousClassName={"page-item"}
                               nextClassName={"page-item"}
                               previousLinkClassName={"page-link"}
                               nextLinkClassName={"page-link"}
                               forcePage={props.pageNumber}       //aktivna stranica
                               onPageChange={handlePageClick}  //handler za menuvanje na strana (sami go implementirame)
                               containerClassName={"pagination justify-content-center"}
                               activeClassName={"active"}
                />
            )
        }
    };

    return (
      <div className="mt-3" style={{cursor : "pointer"}}>
          {paginate()}
      </div>
    );

};

export default pagination;