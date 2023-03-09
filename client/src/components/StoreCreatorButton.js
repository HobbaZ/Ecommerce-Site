import { Button } from "react-bootstrap";

function StoreCreatorButton(props) {
  return (
    props.isAdmin && (
      <div className="text-center">
        <a
          role="button"
          variant="primary"
          className="my-2 w-50"
          href="./storecreator"
        >
          <Button>Create A Store</Button>
        </a>
      </div>
    )
  );
}
export default StoreCreatorButton;
