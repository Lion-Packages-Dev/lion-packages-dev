import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Content from "../../Tools/Content";
import { useNavigate, useParams } from "react-router-dom";

const content = Content();

export default function SelectVersion() {
  const { item_version, library = null, tab, code } = useParams();
  const navigate = useNavigate();

  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(item_version);

  const getVersions = () => {
    if (null === library) {
      return Object.keys(content.framework.versions);
    }

    return Object.keys(content.library[library].versions);
  };

  useEffect(() => {
    setVersions(getVersions());

    setSelectedVersion(item_version);
  }, [item_version, library]);

  useEffect(() => {
    setVersions(getVersions());
  }, []);

  return (
    <InputGroup className="mb-3">
      <Form.Select
        value={selectedVersion}
        onChange={(e) => {
          setSelectedVersion(e.target.value);

          if (null === library) {
            navigate(`/docs/framework/${e.target.value}/${tab}/${code}`);
          } else {
            navigate(
              `/docs/library/${library}/${e.target.value}/${tab}/${code}`
            );
          }
        }}
      >
        {versions.map((version, index) => (
          <option key={index} value={version}>
            {version + (index === 0 ? " lts" : "")}
          </option>
        ))}
      </Form.Select>
    </InputGroup>
  );
}
