"use client"; // Client component olduğunu belirtiyoruz
import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./menu.module.css";
import { paragraphs } from "@/app/constant/constant";
import Graphics from "./Graphics";
interface TableRow {
  ipcount: number;

}

interface TableData {
  data: TableRow[];
}




const rowDropdowns: { [key: number]: boolean } = {
  1: true,
  2: false,
  3: true,
};

const Menu: React.FC = () => {
  
  const [tableData, setTableData] = useState<TableData>({ data: [] });

  const [packageContent, setPackageContent] = useState<any>(null);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://recruitment-api.vercel.app/get-table", {
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`,
          },
        });
        setTableData(response.data);
        response.data.data.forEach((row: any, index: number) => {});
      } catch (error) {
        console.error("Error fetching table data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPackageInfo = async () => {
      try {
        const response = await axios.get("https://recruitment-api.vercel.app/get-info", {
          headers: {
            Authorization: `${localStorage.getItem("jwt")}`,
          },
        });
        setPackageContent(response.data);
      } catch (error) {
        console.error("Error fetching package info:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    fetchPackageInfo();
  }, []);

  const handleDropdownClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); 
  };
  
  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>, rowIndex: number) => {
    const { value } = e.target;
    if (Array.isArray(tableData.data) && tableData.data.length > 0) {
      const ipcount = tableData.data[rowIndex].ipcount;
      console.log(`Number of IP :`, ipcount);
    } else {
      console.error("tableData is not iterable or empty.");
    }
  };
  
  const [rowDropdowns, setRowDropdowns] = useState<{ [key: number]: boolean }>({});
  const handleActionClick = (e: React.MouseEvent<HTMLTableCellElement>, rowIndex: number) => {
    e.stopPropagation();
    const isDropdownOpen = rowDropdowns[rowIndex];
   


    const updatedRowDropdowns = Object.keys(rowDropdowns).reduce((acc, key) => {
      acc[Number(key)] = false; // key'i number türüne dönüştür
      return acc;
    }, {} as { [key: number]: boolean });
    





    if (isDropdownOpen) {
      setRowDropdowns(updatedRowDropdowns);
    } else {
      updatedRowDropdowns[rowIndex] = true;
      setRowDropdowns(updatedRowDropdowns);
    }
  };
  const formatNumber = (number: number) => {
    const formattedNumber = (number / 1000).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedNumber;
  };

  return (
    <div>
      {isLoading ? (
        <p></p>
      ) : (
        <>
          <div className={style.boxHead}>
            <div className={style.box}>
              <h4 className={style.boxheader}>Subscription expires on</h4>
              <p className={style.expiteTime}>{packageContent?.expireTime}</p>
            </div>
            <div className={style.boxtwo}>
              <h4 className={style.boxheader}>Last charge</h4>
              <div>
                <span className={style.percent}> {packageContent?.lastChargeAmount} </span>
                <span className={style.packageContent}>{packageContent?.lastCharge} </span>
              </div>
            </div>
            <div className={style.boxThree}>
              <h4 className={style.boxheaderthree}>Total Usage Data</h4>
              <h3> {packageContent?.totalDataUsage && `${formatNumber(packageContent.totalDataUsage)} GB`}</h3>
            </div>
            <div className={style.boxFour}>
              <h4 className={style.boxheaderFour}>Daily Usage Data</h4>
              <h3>{packageContent?.dailyUsage && `${formatNumber(packageContent.dailyUsage)} GB`}</h3>
            </div>
          </div>
          <div className={style.graphic}>
            <Graphics />
          </div>

          <div className={style.table}>
            {paragraphs.transcactionHistory.map((item, index) => (
              <h3 key={index}>{item.text}</h3>
            ))}
            {tableData && tableData.data ? (
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    {paragraphs.transactions.table.map((item, index) => (
                      <th key={index} className={style.th}>
                        {item.text}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className={style.tableMain}>
                  {tableData.data.map((row, rowIndex) => (
                    <tr key={rowIndex} className={style.tr}>
                      {Object.entries(row).map(([key, value], cellIndex) => (
                        <td key={cellIndex}>
                          {key === "date"
                            ? new Date(value).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : value}
                        </td>
                      ))}
                      <td className={`${style.actionsClose} ${rowDropdowns[rowIndex] ? style.ind : ""}`} onClick={(e) => handleActionClick(e, rowIndex)}>
                        <div className={rowDropdowns[rowIndex] ? style.actionsOpenIcon : style.actionsCloseIcon}>
                          Actions
                          <div className={rowDropdowns[rowIndex] ? style.rotate : style.notRotate}>
                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M11 1L6.88388 5.11612C6.39573 5.60427 5.60427 5.60427 5.11612 5.11612L1 1"
                                stroke={rowDropdowns[rowIndex] ? "#4359CA" : "black"}
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                        </div>
                        {rowDropdowns[rowIndex] && (
                          <div className={style.trDropdown} onClick={handleDropdownClick}>
                            {paragraphs.actions.navigator.map((item, index) => (
                              <div onClick={(e:any) => handleDropdownChange(e, rowIndex)} key={index}>
                                {item.text}
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
