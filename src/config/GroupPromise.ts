/*
 * Mimium Pty. Ltd. ("LKG") CONFIDENTIAL
 * Copyright (c) 2022 Mimium project Pty. Ltd. All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of LKG. The intellectual and technical concepts contained
 * herein are proprietary to LKG and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from LKG.  Access to the source code contained herein is hereby forbidden to anyone except current LKG employees, managers or contractors who have executed
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 */
import axios from "axios";

class GroupPromise {
  private executing = false;

  private promise: Promise<unknown> | undefined;

  execute(url: string): Promise<unknown> | undefined {
    if (this.executing) {
      return this.promise;
    }
    this.executing = true;
    this.promise = new Promise((resolve, reject) => {
      axios
        .post(url)
        .then((result) => {
          this.executing = false;
          resolve(result);
        })
        .catch((error) => {
          this.executing = false;
          reject(error);
        });
    });

    return this.promise;
  }
}

export default new GroupPromise();