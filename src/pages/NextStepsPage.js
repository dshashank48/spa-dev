import React from "react";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/phone.svg";
import { ReactComponent as DocumentTextIcon } from "../assets/icons/document-text.svg";
import Card from "../components/Card";

const getIcon = id => {
  switch (id) {
    case 0:
      return <SearchIcon className="w-12" />;
    case 1:
    case 2:
      return <PhoneIcon className="w-12" />;
    case 3:
    case 4:
      return <DocumentTextIcon className="w-12" />;
    default:
      return <SearchIcon className="w-12" />;
  }
};

const NextStepsPage = ({ data }) => {
  const { items } = data.attributes.pageData.table;

  return (
    <Card title={data.attributes.title} className="overflow-y-auto">
      <div className="flex h-full flex-col">
        {items.map(item => {
          return (
            <div
              key={item.id}
              className="mb-6 flex w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-50 via-blue-50"
            >
              <div className="flex w-28 items-center justify-center bg-blue-100 py-8 text-blue-500">
                {getIcon(item.id)}
              </div>
              <div className="prose p-4">
                <p>{item.text}</p>
                <ul>
                  {item.bullets.map((bullet, i) => (
                    <li key={i}>
                      {bullet}
                      {i === item.bullets.length - 1 && item.subBullets && (
                        <>
                          <ul>
                            {item.subBullets.map((bullet, i) => (
                              <li key={i}>{bullet}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default NextStepsPage;
