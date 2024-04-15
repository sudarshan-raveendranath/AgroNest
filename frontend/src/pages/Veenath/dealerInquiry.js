import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InquiryRow from '../../Component/Veenath/InquiryRow';
import { Link } from 'react-router-dom';

const DealerInquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [pendingInquiries, setPendingInquiries] = useState([]);
  const [resolvedDealerInquiries, setResolvedDealerInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/reports');
        setInquiries(response.data);
        setPendingInquiries(response.data.filter(inquiry => inquiry.status === 'Pending'));
        setResolvedDealerInquiries(response.data.filter(inquiry => inquiry.status === 'Resolved' && inquiry.category === 'Dealer'));
      } catch (error) {
        console.error(error);
      }
    };
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/api/reports/${id}`);
      setInquiries(inquiries.filter(inquiry => inquiry._id !== id));
      setPendingInquiries(pendingInquiries.filter(inquiry => inquiry._id !== id));
      setResolvedDealerInquiries(resolvedDealerInquiries.filter(inquiry => inquiry._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Dealer Inquiries</h1>
      <div>
        <h2>Pending Inquiries</h2>
        {pendingInquiries.map((inquiry) => (
          <div key={inquiry._id}>
            <InquiryRow inquiry={inquiry} />
            <button onClick={() => handleDelete(inquiry._id)}>Delete</button>
            <Link to={`/formPage?id=${inquiry._id}`}>
              <button>Update</button>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <h2>Resolved Inquiries</h2>
        {resolvedDealerInquiries.map((inquiry) => (
          <div key={inquiry._id}>
            <InquiryRow inquiry={inquiry} />
            <button onClick={() => handleDelete(inquiry._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DealerInquiry;
