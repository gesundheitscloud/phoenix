import { FileOpener } from '@capacitor-community/file-opener';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Component, h, State } from '@stencil/core';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import databases from '../../databases';
import { IS_NATIVE } from '../../global/utils';

const blobToBase64 = (blob: Blob): Promise<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
  });
};

@Component({
  tag: 'records-list',
  styleUrl: 'records-list.css',
  shadow: true,
})
export class RecordsList {
  @State() records: any[] = [];
  @State() record: string = undefined;
  @State() canAdd: boolean = false;

  constructor() {}

  async componentWillRender() {
    await this.fetchRecords();
  }

  async fetchRecords() {
    this.records = await databases.records.getRecords();
  }

  changeRecord = (event: any) => {
    try {
      this.record = JSON.parse(event.target.value);
      this.canAdd = true;
    } catch (error) {
      this.canAdd = false;
      return;
    }
  };

  addRecord = async () => {
    if (!!this.record) {
      await databases.records.addRecord(this.record);
      await this.fetchRecords();
      this.record = undefined;
    }
  };

  downloadRecords = async () => {
    const zip = new JSZip();
    for (const record of this.records) {
      zip.file(`record-${record.id}.json`, JSON.stringify(record.record, undefined, 2));
    }
    const content = await zip.generateAsync({ type: 'blob' });

    if (IS_NATIVE) {
      const blobAsBase64 = await blobToBase64(content);
      const base64FileData = blobAsBase64.split(',')[1];
      const result = await Filesystem.writeFile({
        path: 'download.zip',
        data: base64FileData,
        directory: Directory.Data,
        recursive: true,
      });

      await FileOpener.open({ filePath: result.uri, contentType: 'application/zip' });
    } else {
      FileSaver.saveAs(content, 'download.zip');
    }
  };

  deleteAllRecords = async () => {
    for (const record of this.records) {
      await databases.records.deleteRecord(record.id);
    }
    await this.fetchRecords();
  };

  deleteRecord = async (recordId: number) => {
    await databases.records.deleteRecord(recordId);
    await this.fetchRecords();
  };

  render() {
    return (
      <div class="records">
        <h2>Add a record</h2>

        <textarea value={JSON.stringify(this.record)} onInput={this.changeRecord}></textarea>
        <button onClick={this.addRecord} disabled={!this.canAdd}>
          Add
        </button>

        <h2>All records</h2>
        <ul>
          <li>
            <span>ID</span>
            <span>RECORD</span>
          </li>
          {this.records.map((r) => (
            <li>
              <span>{r.id}</span>
              <span>{JSON.stringify(r.record, undefined, 2)}</span>
              <span>
                <button onClick={() => this.deleteRecord(r.id)} disabled={!this.records.length}>
                  Delete
                </button>
              </span>
            </li>
          ))}
        </ul>
        <button onClick={this.downloadRecords} disabled={!this.records.length}>
          Download all
        </button>
        <button onClick={this.deleteAllRecords} disabled={!this.records.length}>
          Delete all
        </button>
      </div>
    );
  }
}
