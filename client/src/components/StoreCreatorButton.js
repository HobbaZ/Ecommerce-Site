import { Button } from "react-bootstrap";

function StoreCreatorButton(props) {
  return (
    props.isAdmin && (
      <div className="text-center">
        <a variant="primary" href="./storecreator">
          <Button className="my-2 w-25">Create A Store</Button>
        </a>
      </div>
    )
  );
}
export default StoreCreatorButton;
