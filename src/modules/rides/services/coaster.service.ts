import { createConnection } from 'mysql';
import { Injectable } from '@nestjs/common';
import { Coaster } from '../models/coaster.model';

@Injectable()
export class CoasterService {
  // private mockCoasters: Coaster[] = [
  //   <Coaster>{
  //     coasterId: 1,
  //     name: 'Skyrush',
  //     park: 'Hersheypark',
  //     imgSrcList: [
  //       'https://captaincoaster.com/media/cache/thumb_coaster/0/0ecb192a-6f69-4ce6-a9ea-f36d8ac032d0.jpg',
  //       'https://captaincoaster.com/media/cache/thumb_coaster/f/fa3918f7-3e50-4f70-8145-786cd191c7da.jpg',
  //       'https://captaincoaster.com/media/cache/thumb_coaster/a/a601e37e-b74f-45c8-afdd-ca5d1e362d87.jpg',
  //       'https://captaincoaster.com/media/cache/thumb_coaster/a/a23e1f90-3a73-4626-9091-4fcc00a5afea.jpg',
  //       //'https://captaincoaster.com/media/cache/thumb_coaster/a/a601e37e-b74f-45c8-afdd-ca5d1e362d87.jpg',
  //       //'https://captaincoaster.com/media/cache/thumb_coaster/a/a601e37e-b74f-45c8-afdd-ca5d1e362d87.jpg'
  //     ],
  //     ratingAverage: 4.21,
  //     ratingCount: 307,
  //     rank: 127,
  //     goldenTicketAwards: '6',
  //     colorPrimary: '#33a5d6',
  //     colorSecondary: '#2c2987',
  //     stats: {
  //       heightInFt: 460,
  //       dropInFt: 456,
  //       lengthInFt: 2105,
  //       speedInMph: 120,
  //       angleInDegrees: 90,
  //       inversionCount: 0
  //     },
  //     train: {
  //       numCars: 8,
  //       numRowsPerCar: 1,
  //       numInsideSeatsPerRow: 2,
  //       numOutsideSeatsPerRow: 2
  //     },
  //     info: {
  //       manufacturer: 'Intamin',
  //       type: 'Steel',
  //       model: 'Mega',
  //       openedDate: new Date(2005, 5, 22),
  //       closedDate: new Date(2011, 9, 30),
  //       goldenTicketRankingMsg: '#34th, 2021',
  //       location: 'Hershey, Pennsylvania, United States'
  //     },
  //     userRating: 4
  //   },
  //   <Coaster>{
  //     coasterId: 3,
  //     name: 'The Beast',
  //     park: 'Kings Island',
  //     imgSrcList: [
  //       'https://captaincoaster.com/media/cache/thumb_coaster/0/0ecb192a-6f69-4ce6-a9ea-f36d8ac032d0.jpg',
  //       'https://captaincoaster.com/media/cache/thumb_coaster/f/fa3918f7-3e50-4f70-8145-786cd191c7da.jpg',
  //       'https://captaincoaster.com/media/cache/thumb_coaster/a/a601e37e-b74f-45c8-afdd-ca5d1e362d87.jpg',
  //       'https://captaincoaster.com/media/cache/thumb_coaster/a/a23e1f90-3a73-4626-9091-4fcc00a5afea.jpg',
  //       //'https://captaincoaster.com/media/cache/thumb_coaster/a/a601e37e-b74f-45c8-afdd-ca5d1e362d87.jpg',
  //       //'https://captaincoaster.com/media/cache/thumb_coaster/a/a601e37e-b74f-45c8-afdd-ca5d1e362d87.jpg'
  //     ],
  //     ratingAverage: 4.21,
  //     ratingCount: 307,
  //     rank: 127,
  //     goldenTicketAwards: '6',
  //     colorPrimary: '#34cf58',
  //     colorSecondary: '#24c8d1',
  //     stats: {
  //       heightInFt: 460,
  //       dropInFt: 456,
  //       lengthInFt: 2105,
  //       speedInMph: 120,
  //       angleInDegrees: 90,
  //       inversionCount: 0
  //     },
  //     train: {
  //       numCars: 5,
  //       numRowsPerCar: 3,
  //       numInsideSeatsPerRow: 2,
  //       numOutsideSeatsPerRow: 0
  //     },
  //     info: {
  //       manufacturer: '???',
  //       type: 'Wood',
  //       model: '???',
  //       openedDate: new Date(2005, 5, 22),
  //       closedDate: new Date(2011, 9, 30),
  //       goldenTicketRankingMsg: '#34th, 2021',
  //       location: 'Mason, Ohio, United States'
  //     },
  //     userRating: 4
  //   },
  //   <Coaster>{
  //     coasterId: 4,
  //     name: 'Magnum XL-200',
  //     park: 'Cedar Point',
  //     imgSrcList: [
  //       'https://captaincoaster.com/media/cache/thumb_coaster/0/0ecb192a-6f69-4ce6-a9ea-f36d8ac032d0.jpg',
  //       'https://captaincoaster.com/media/cache/thumb_coaster/f/fa3918f7-3e50-4f70-8145-786cd191c7da.jpg',
  //       'https://captaincoaster.com/media/cache/thumb_coaster/a/a601e37e-b74f-45c8-afdd-ca5d1e362d87.jpg',
  //       'https://captaincoaster.com/media/cache/thumb_coaster/a/a23e1f90-3a73-4626-9091-4fcc00a5afea.jpg',
  //       //'https://captaincoaster.com/media/cache/thumb_coaster/a/a601e37e-b74f-45c8-afdd-ca5d1e362d87.jpg',
  //       //'https://captaincoaster.com/media/cache/thumb_coaster/a/a601e37e-b74f-45c8-afdd-ca5d1e362d87.jpg'
  //     ],
  //     ratingAverage: 4.47,
  //     ratingCount: 514,
  //     rank: 35,
  //     goldenTicketAwards: '6',
  //     colorPrimary: '#fafffb',
  //     colorSecondary: '#262626',
  //     stats: {
  //       heightInFt: 460,
  //       dropInFt: 456,
  //       lengthInFt: 2105,
  //       speedInMph: 120,
  //       angleInDegrees: 90,
  //       inversionCount: 0
  //     },
  //     train: {
  //       numCars: 6,
  //       numRowsPerCar: 3,
  //       numInsideSeatsPerRow: 2,
  //       numOutsideSeatsPerRow: 0
  //     },
  //     info: {
  //       manufacturer: 'Arrow Dynamics',
  //       type: 'Steel',
  //       model: 'Hyper',
  //       openedDate: new Date(2005, 5, 22),
  //       closedDate: new Date(2011, 9, 30),
  //       goldenTicketRankingMsg: '#34th, 2021',
  //       location: 'Sandusky, Ohio, United States'
  //     },
  //     userRating: 4
  //   }
  // ];

  getCoasters(): Promise<Coaster[]> {
    return new Promise((resolve, reject) => {
      createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'ride'
      })
      .query('SELECT * FROM Coasters', (error, results, fields) => {
        if (error)
          reject(error);
        resolve(Object.values(results));
      });
    });
  }

  getCoaster(id: number): Promise<Coaster> {
    return new Promise((resolve, reject) => {
      createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'ride'
      })
      .query(`SELECT * FROM Coasters WHERE CoasterId = ${id} LIMIT 1`, (error, results, fields) => {
        if (error)
          reject(error);
        resolve(results[0]);
      });
    });
  }
}
