import './Card.css';

const Card = ({title, children, icon}) => {
  return (
    <article className="ui-card">
      {icon && <div className="ui-card-icon" aria-hidden>{icon}</div>}
      {title && <h3 className="ui-card-title">{title}</h3>}
      <div className="ui-card-body">{children}</div>
    </article>
  );
};

export default Card;
