import styles from './PaginationButtons.module.css';

const PaginationButtons = ({ totalPages, handlePageChange, currentPage }: any) => {
    const buttons = [];

    for (let page = 1; page <= totalPages; page++) {
        buttons.push(
            <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={page === currentPage}
                className={styles.navButton}
            >
                {page}
            </button>
        );
    }

    return <div>{buttons}</div>;
};

export default PaginationButtons