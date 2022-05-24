const Footer = ({length}) => {

    return (
        <footer>
            <h3>{length} grocery {length === 1 ? 'item': 'items'}</h3>
        </footer>
    )
}
export default Footer