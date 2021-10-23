import { Schema, model, connect } from 'mongoose';
import { IVideo } from '../model/video';

export async function saveVideo(video: IVideo): Promise<void> {
  const schema = new Schema<IVideo>({
    title: { type: String, required: true },
    status: { type: String, required: true },
  });

  const VideoModel = model<IVideo>('IVideo', schema);

  // 4. Connect to MongoDB
  await connect('mongodb://localhost:27017/test');

  const doc = new VideoModel({
    title: video.title,
    status: video.status,
  });

  await doc.save();

  console.log(doc.title);
}
