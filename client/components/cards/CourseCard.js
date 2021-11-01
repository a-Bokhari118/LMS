import { Card, Badge } from 'antd';
import Link from 'next/link';
import { currencyFormatter } from '../../utils/helpers';

const { Meta } = Card;

const CourseCard = ({ course }) => {
  const { name, instructor, price, image, slug, paid, category } = course;
  return (
    <Link href={`/course/${slug}`}>
      <a>
        <Card
          className="mb-4"
          cover={
            <img
              src={image.Location}
              alt={course.name}
              style={{ height: '300px', width: '350', objectFit: 'cover' }}
              className="p-1"
            />
          }
        >
          <h2 className="font-weight-bold">{name}</h2>
          <p>by {instructor.name}</p>

          <Badge count={category} />

          <h4 className="pt-2">
            {paid
              ? currencyFormatter({
                  amount: price,
                  currency: 'usd',
                })
              : 'Free'}
          </h4>
        </Card>
      </a>
    </Link>
  );
};

export default CourseCard;
